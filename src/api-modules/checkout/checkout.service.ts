import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckoutDTO } from '../../dtos/checkout-dto';
import { PaymentMethod, PaymentStatus } from '../../enums/payment-method.enum';
import { Checkout, CheckoutDocument } from '../../database-models/checkout.model';
import { Promotion } from '../../database-models/promotion.model';
import { Wallet } from '../../database-models/wallet-model';
import { Lang } from '../../shared/enums/lang.enum';
import { OverrideUtils } from '../../shared/override-utils';
import { Payment } from '../../security/constants';
import { CourseService } from '../course/course.service';
import { NoticeService } from '../notice/notice.service';
import { PromotionService } from '../promotion/promotion.service';
import { UserService } from '../user/user.service';
import { HttpService } from '@nestjs/axios';
import { PricingService } from '../pricing/pricing.service';
import { Course } from '../../database-models/course/course.model';
import { Pricing } from '../../database-models/pricing.model';
import { CourseType } from '../../enums/course-type.enum';
import { AndroidPurchaseResponse } from '../../dtos/android-purchase-response.dto';
import { InAppPurchaseRequest } from '../../dtos/in-app-purchase-request.dto';
import { map } from 'rxjs/operators';
import { firstValueFrom } from 'rxjs';
const ObjectId = require('mongoose').Types.ObjectId;

const { google } = require('googleapis');
const androidpublisher = google.androidpublisher('v3');


@Injectable()
export class CheckoutService {



  constructor(
    @InjectModel(Checkout.name) public CheckoutModel: Model<CheckoutDocument>,
    @Inject(forwardRef(() => CourseService))
    private courseService: CourseService,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    @Inject(forwardRef(() => PromotionService))
    private promotionService: PromotionService,
    private noticeService: NoticeService,
    private httpService: HttpService,
    private pricingService: PricingService,
  ) { }

  private readonly log = new Logger(CheckoutService.name);

  async save(req: Checkout) {
    let saved = await this.CheckoutModel.create(req);
    return saved;
  }

  async checkAndPay(
    req,
    body: CheckoutDTO,
  ): Promise<Checkout[] | PromiseLike<any>> {
    let promotion: Promotion;
    if (body.promoCode && body.promoCode !== null && body.promoCode !== '') {
      promotion = await this.promotionService.PromotionModel.findOne({
        code: body.promoCode,
      }).exec();
      if (!promotion)
        throw new BadRequestException(
          req?.user?.defaultLang === Lang.en
            ? `${body.promoCode} Not found`
            : `لم يتم العثور على كود ${body.promoCode}`,
        );
      if (promotion.useOnce) {
        let existsCheckout = await this.CheckoutModel.exists({
          promoCode: body.promoCode,
        });
        if (existsCheckout) {
          throw new BadRequestException(
            req?.user?.defaultLang === Lang.en
              ? `${body.promoCode} used before`
              : `مستخدم من قبل ${body.promoCode}`,
          );
        }
      }
    }

    let checkouts: Checkout[] = [];
    for await (let course of body.courses) {
      let checkout = new Checkout();

      if (body.purchasedFor) {
        checkout.user = await this.userService.UserModel.findOne({
          studentId: body.purchasedFor,
        }).exec();
        if (!checkout.user)
          throw new BadRequestException(
            req.user.defaultLang === Lang.en
              ? 'please enter correct student id'
              : 'لا يوجد طالب بالكود الموجود',
          );
      } else {
        checkout.user = new ObjectId(req.user._id);
      }

      course = await this.courseService.CourseModel.findById(course._id);

      checkout.course = course;
      checkout.price = await this.calculatePrice(course, body.paymentMethod);

      checkout.valueDate = Date.now();
      checkout.priceBeforeDiscount = checkout.price;

      if (promotion) {
        checkout.discount =
          (checkout.priceBeforeDiscount * promotion.discountPercent) / 100;
        checkout.priceAfterDiscount =
          checkout.priceBeforeDiscount - checkout.discount;
      } else {
        checkout.priceAfterDiscount = checkout.priceBeforeDiscount;
      }

      // if (checkout.course.startDate < Date.now())
      //     throw new BadRequestException(req?.user?.defaultLang === Lang.en ? "can not purchace started course" : "لا يمكن شراء كورس بدأ بالفعل");

      let checkoutSaved = await this.CheckoutModel.create(checkout);

      checkouts.push(checkoutSaved);
    }

    //TODO Payment
    let user = await this.userService.findOne(req.user._id);
    user.cart = [];
    await this.userService.update(req.user._id, user);

    let paymentResult: any;

    await firstValueFrom(this.httpService.post('/v1/checkouts', null, {
      baseURL: Payment.baseURL,
      method: 'POST',
      headers: {
        'Authorization': Payment.token
      },
      params: {
        'entityId': body.paymentMethod !== PaymentMethod.MADA ? Payment.entityIdVisaMaster : Payment.entityIdMada,
        'amount': checkouts.reduce((acc, check) => acc + check.priceAfterDiscount, 0).toFixed(0),
        'merchantTransactionId': checkouts.reduce((acc, check) => acc + '-' + check['_id'].toString(), ''),
        'customer.email': req.user.email,
        'currency': Payment.Currency,
        'paymentType': Payment.paymentType,
      }
    })).then(res => {
      if (res.data['result']['code'] === '000.200.100' || res.data['result']['code'] === '000.000.000')
        paymentResult = res.data
      else throw new BadRequestException(res.data['result']['description']);
    }).catch(async err => {
      console.log(err.response.data.result)

      await this.CheckoutModel.deleteMany(checkouts);

      throw new BadRequestException(err.response.data.result.description)
    });


    for await (const checkout of checkouts) {

      checkout.paymentResult = paymentResult;
      checkout.paymentId = paymentResult.id;
      await this.CheckoutModel.findByIdAndUpdate(checkout._id, { $set: checkout });
    }

    return { _id: paymentResult.id, paymentMethod: body.paymentMethod }
  }
  async calculatePrice(
    course: Course,
    paymentMethod: PaymentMethod,
  ): Promise<number> {
    let pricing = await this.pricingService.getCurrentPricings();


    switch (course.type) {
      case CourseType.home:
        return course.price ?? 0;
      case CourseType.session:
        return paymentMethod === PaymentMethod.APPLE
          ? pricing.sessionApplePrice ?? 0
          : PaymentMethod.ANDROID
            ? pricing.sessionAndroidPrice ?? 0
            : pricing.sessionWebPrice ?? 0;
      case CourseType.tutorial:
        return paymentMethod === PaymentMethod.APPLE
          ? pricing.tutorialApplePrice ?? 0
          : PaymentMethod.ANDROID
            ? pricing.tutorialAndroidPrice ?? 0
            : pricing.tutorialWebPrice ?? 0;
      default:
        return 0;
    }
  }

  async authorize(paymentMethod: string, id: string, path: string) {
    let checkouts = await this.CheckoutModel.find({ paymentId: id });
    let paymentResult;
    path += `?entityId=${paymentMethod !== PaymentMethod.MADA
      ? Payment.entityIdVisaMaster
      : Payment.entityIdMada
      }`;

    if (
      checkouts.reduce((acc, check) => acc + check.priceAfterDiscount, 0) > 0
    ) {
      await firstValueFrom(this.httpService
        .get(path, {
          baseURL: Payment.baseURL,
          method: 'GET',
          headers: {
            Authorization: Payment.token,
          },
        })).then((res) => {
          paymentResult = res.data;
          console.log(res.data.result);
          return res;
        }).catch((err) => {
          paymentResult = err.response.data;
        })

    }
    for await (const checkout of checkouts) {
      if (
        checkouts.reduce((acc, check) => acc + check.priceAfterDiscount, 0) == 0
      ) {
        checkout.paymentResult = {
          result: {
            code: '000.100.110',
          },
        };
      }
      checkout.paymentResult = paymentResult;
      checkout.paymentStatus =
        checkouts.reduce((acc, check) => acc + check.priceAfterDiscount, 0) == 0
          ? PaymentStatus.Paid
          : paymentResult.result?.code === '000.100.110'
            ? PaymentStatus.Paid
            : PaymentStatus.Fail;
      console.log('checkout', checkout.paymentStatus);

      await this.CheckoutModel.findByIdAndUpdate(checkout['_id'], checkout);

      try {
        let course = checkout['course'];
        // course.enrolled = await this.CheckoutModel.count({ paymentStatus: PaymentStatus.Paid, course: course });
        await this.courseService.CourseModel.updateOne(
          { _id: checkout.course['_id'] },
          course,
        );
        this.noticeService.sendSpecificNotification({
          userId: checkout.user['_id'].toString(),
          notification: {
            title:
              checkout.user.defaultLang === Lang.en
                ? `Successfull Subscription`
                : `تم الاشتراك بنجاح`,
            body:
              checkout.user.defaultLang === Lang.en
                ? `your subscription is successfull to coursse ${course.name} with teacher ${course.teacher?.name} with amount ${checkout.priceAfterDiscount}`
                : `تم الاشتراك بنجاح في دورة ${course.name} مع المدرس ${course.teacher?.name} بمبلغ ${checkout.priceAfterDiscount}`,
          },
          data: {
            entityType: 'Course',
            entityId: course['_id'].toString(),
          },
        });
        this.noticeService.sendSpecificNotification({
          userId: course.teacher['_id'].toString(),
          notification: {
            title:
              course.teacher.defaultLang === Lang.en
                ? `new Subscription`
                : `لديــك اشتــراك جديــد`,
            body:
              course.teacher.defaultLang === Lang.en
                ? `you have a new subscription ${course.name.en} with amount ${checkout.priceAfterDiscount}`
                : `لديك اشتراك جديد في دورة ${course.name.ar} بمبلغ ${checkout.priceAfterDiscount}`,
          },
          data: {
            entityType: 'Course',
            entityId: course['_id'].toString(),
          },
        });
        this.userService.createWalletForCheckout(checkout);
      } catch (e) { }
    }

    return paymentResult.result;
  }


  purchased(req: any, courseId: string) {
    return this.CheckoutModel.exists({
      $and: [
        { course: new ObjectId(courseId) },
        { user: new ObjectId(req.user._id) },
        { paymentStatus: PaymentStatus.Paid },
      ]
    });
  }


  async subscribers(req: any, courseId: string)  {
    return await (await this.CheckoutModel.find({
      $and: [
        { course: new ObjectId(courseId) },
        // { user: new ObjectId(req.user._id) },
        { paymentStatus: PaymentStatus.Paid },
      ]
    })).map((res)=>res.user);
  }

  async verifyInAppPurchase(req, body: InAppPurchaseRequest) {
    if (body.appType === PaymentMethod.ANDROID) {

      const auth = new google.auth.GoogleAuth({
        keyFile: './ts-academy-336923-e6156fa56c54.json',
        // Scopes can be specified either as an array or as a single, space-delimited string.
        scopes: ['https://www.googleapis.com/auth/androidpublisher'],
      });

      // Acquire an auth client, and bind it to all future calls
      const authClient = await auth.getClient();

      google.options({ auth: authClient });

      const res = await androidpublisher.purchases.products.get({

        // The package name of the application for which this subscription was purchased (for example, 'com.some.thing').
        packageName: 'com.ts_academy',
        // The purchased subscription ID (for example, 'monthly001').
        productId: body.productId,
        // The token provided to the user's device when the subscription was purchased.
        token: body.orderToken,
      });
      const data = res.data as AndroidPurchaseResponse;

      if (res.status === 200 && data.purchaseState === 0 && data.consumptionState === 1) {

        // if (await this.CheckoutModel.exists({ paymentId: data.orderId })) {
        //   throw new BadRequestException('you are already purchased this course')
        // }
        let checkout = new Checkout();

        if (body.purchasedFor) {
          checkout.user = await this.userService.UserModel.findOne({
            studentId: body.purchasedFor,
          }).exec();
          if (!checkout.user)
            throw new BadRequestException(
              req.user.defaultLang === Lang.en
                ? 'please enter correct student id'
                : 'لا يوجد طالب بالكود الموجود',
            );
        } else {
          checkout.user = new ObjectId(req.user._id);
        }

        let course = await this.courseService.CourseModel.findById(body.courseId);

        checkout.course = course;
        checkout.price = await this.calculatePrice(course, body.appType);

        checkout.valueDate = Date.now();
        checkout.priceBeforeDiscount = checkout.price;
        checkout.priceAfterDiscount = checkout.price;
        checkout.paymentResult = data;
        checkout.paymentMethod = body.appType;
        checkout.paymentStatus = PaymentStatus.Paid;
        checkout.discount = 0;
        checkout.paymentId = data.orderId;

        let checkoutSaved = await this.CheckoutModel.create(checkout);

        return checkoutSaved ? true : false;
      } else {
        return false;
      }
    }
    if (body.appType === PaymentMethod.APPLE) {

    }

  }
}
