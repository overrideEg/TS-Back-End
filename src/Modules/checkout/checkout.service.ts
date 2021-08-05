import { BadRequestException, forwardRef, HttpService, Inject, Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckoutDTO } from '../../dtos/checkout-dto';
import { PaymentMethod } from '../../enums/payment-method.enum';
import { TransactionStatus, TransactionType } from '../../enums/wallet.enum';
import { Checkout, CheckoutDocument } from '../../Models/checkout.model';
import { Promotion } from '../../Models/promotion.model';
import { Wallet } from '../../Models/wallet-model';
import { Lang } from '../../shared/enums/lang.enum';
import { OverrideUtils } from '../../shared/override-utils';
import { Payment } from '../auth/Security/constants';
import { CourseService } from '../course/course.service';
import { NoticeService } from '../notice/notice.service';
import { PromotionService } from '../promotion/promotion.service';
import { UserService } from '../user/user.service';
const ObjectId = require('mongoose').Types.ObjectId;

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
        private httpService: HttpService
    ) { }

    private readonly log = new Logger(CheckoutService.name);

    async save(req: Checkout) {
        let saved = await this.CheckoutModel.create(req);
        return saved;
    }

    async checkAndPay(req, body: CheckoutDTO): Promise<Checkout[] | PromiseLike<Checkout[]>> {


        let promotion: Promotion;
        if (body.promoCode && body.promoCode !== null && body.promoCode !== "") {
            promotion = await this.promotionService.PromotionModel.findOne({ code: body.promoCode }).exec();
            if (!promotion)
                throw new BadRequestException(req?.user?.defaultLang === Lang.en ? `${body.promoCode} Not found` : `لم يتم العثور على كود ${body.promoCode}`);
            if (promotion.useOnce) {
                let existsCheckout = await this.CheckoutModel.exists({ promoCode: body.promoCode });
                if (existsCheckout) {
                    throw new BadRequestException(req?.user?.defaultLang === Lang.en ? `${body.promoCode} used before` : `مستخدم من قبل ${body.promoCode}`);
                }
            }
        }



        let checkouts: Checkout[] = []
        for await (const course of body.courses) {

            let checkout = new Checkout();

            if (body.purchasedFor) {
                checkout.user = await this.userService.UserModel.findOne({ studentId: body.purchasedFor }).exec();
                if (!checkout.user)
                    throw new BadRequestException(req.user.defaultLang === Lang.en ? 'please enter correct student id' : 'لا يوجد طالب بالكود الموجود');

            } else {
                checkout.user = new ObjectId(req.user.id)
            }

            checkout.course = await this.courseService.CourseModel.findById(course['_id']);
            checkout.price = checkout.course.price;

            checkout.valueDate = Date.now();
            checkout.priceBeforeDiscount = checkout.price;

            if (promotion) {
                checkout.discount = (checkout.priceBeforeDiscount * promotion.discountPercent / 100);
                checkout.priceAfterDiscount = checkout.priceBeforeDiscount - checkout.discount;

            } else {
                checkout.priceAfterDiscount = checkout.priceBeforeDiscount;
            }

            // if (checkout.course.startDate < Date.now())
            //     throw new BadRequestException(req?.user?.defaultLang === Lang.en ? "can not purchace started course" : "لا يمكن شراء كورس بدأ بالفعل");

            let checkoutSaved = await this.CheckoutModel.create(checkout);

            // checkout.course['enrolled'] = await this.CheckoutModel.count({ course: new ObjectId(checkout.course['_id'].toString()) }).exec()
            // await this.courseService.CourseModel.updateOne({ _id: checkout.course['_id'] }, course);
            //    await this.userService.createWalletForCheckout(checkoutSaved);
            //     this.noticeService.sendSpecificNotification(
            //         {
            //             userId: req.user.id,
            //             notification: {
            //                 title: req.user.defaultLang === Lang.en ? `Successfull Subscription` : `تم الاشتراك بنجاح`,
            //                 body: req.user.defaultLang === Lang.en ? `your subscription is successfull to coursse ${course.name} with teacher ${course.teacher.name} with amount ${checkout.priceAfterDiscount}` :
            //                     `تم الاشتراك بنجاح في دورة ${course.name} مع المدرس ${course.teacher.name} بمبلغ ${checkout.priceAfterDiscount}`
            //             },
            //             data: {
            //                 entityType: 'Course',
            //                 entityId: course['_id'].toString()
            //             }
            //         }
            //     )
            //     this.noticeService.sendSpecificNotification(
            //         {
            //             userId: course.teacher['_id'].toString(),
            //             notification: {
            //                 title: course.teacher.defaultLang === Lang.en ? `new Subscription` : `لديــك اشتــراك جديــد`,
            //                 body: course.teacher.defaultLang === Lang.en ? `you have a new subscription ${course.name} with amount ${checkout.priceAfterDiscount}` :
            //                     `لديك اشتراك جديد في دورة ${course.name} بمبلغ ${checkout.priceAfterDiscount}`
            //             },
            //             data: {
            //                 entityType: 'Course',
            //                 entityId: course['_id'].toString()
            //             }
            //         }
            //     )
            checkouts.push(checkoutSaved)
        }

        //TODO Payment
        let user = await this.userService.findOne(req.user.id);
        user.cart = [];
        await this.userService.update(req.user.id, user)

        let paymentResult: any;
        await this.httpService.post('https://test.oppwa.com/v1/checkouts', null, {
            headers: {
                'Authorization': Payment.token
            },
            params: {
                'entityId': body.paymentMethod !== PaymentMethod.MADA ? Payment.entityIdVisaMaster : Payment.entityIdMada,
                'amount': checkouts.reduce((acc, check) => acc + check.priceAfterDiscount, 0).toFixed(0),
                'merchantTransactionId': checkouts.reduce((acc, check) => acc + '-' + check['_id'].toString(), ''),
                'testMode': 'EXTERNAL',
                'customer.email': req.user.email,
                'currency': Payment.Currency,
                'paymentBrand': body.paymentMethod,
                'paymentType': Payment.paymentType,
                'card.number': body.cardNumber,
                'card.holder': body.holder,
                'card.expiryMonth': body.expireMonth,
                'card.expiryYear': body.expireYear,
                'card.cvv': body.cvv,
            }
        }).toPromise().then(res => {
            if (res.data['result']['code'] === '000.200.100' || res.data['result']['code'] === '000.000.000')
                paymentResult = res.data
            else throw new BadRequestException(res.data['result']['description']);
        }).catch(async err => {
            console.log(err.response.data.result)

            await this.CheckoutModel.deleteMany(checkouts);

            throw new BadRequestException(err.response.data.result.description)
        })


        for await (const checkout of checkouts) {
            // checkout.paymentResult = paymentResult;
            // checkout.paymentId = paymentResult.id;
            await this.CheckoutModel.findByIdAndUpdate(checkout['_id'].toString(), {
                paymentId: paymentResult.id
            });
        }




        return { ...paymentResult, resultUrl: `http://localhost:3093/v1/Checkout/authorize/${body.paymentMethod}/${paymentResult.id}` }
    }



    async authorize(paymentMethod: string, id: string, resourcePath: string) {
        let checkouts = await this.CheckoutModel.find({ paymentId: id });
        console.log('id', id);
        console.log('resourcePath', resourcePath);
        let paymentResult;
        let path = `https://test.oppwa.com/v1/checkouts/${id}/payment?entityId=${paymentMethod !== PaymentMethod.MADA ? Payment.entityIdVisaMaster : Payment.entityIdMada}`;

        await this.httpService.get(path, {

            headers: {
                'Authorization': Payment.token
            },
            params: {
                'entityId': paymentMethod !== PaymentMethod.MADA ? Payment.entityIdVisaMaster : Payment.entityIdMada,
            },



        }).toPromise().then(res => {
            paymentResult = res.data
        }).catch(async err => {
            console.log(err.response.data.result)

            // await this.CheckoutModel.deleteMany(checkouts);

            throw new BadRequestException(err.response.data.result.description)
        })

        return paymentResult
    }


}