import { BadRequestException, forwardRef, Inject, Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckoutDTO } from '../../dtos/checkout-dto';
import { TransactionStatus, TransactionType } from '../../enums/wallet.enum';
import { Checkout, CheckoutDocument } from '../../Models/checkout.model';
import { Promotion } from '../../Models/promotion.model';
import { Wallet } from '../../Models/wallet-model';
import { Lang } from '../../shared/enums/lang.enum';
import { OverrideUtils } from '../../shared/override-utils';
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
        private promotionService: PromotionService,
        private noticeService: NoticeService
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
        let checkouts = []
        for await (const course of body.courses) {

            let checkout = new Checkout();

            if (body.purchasedFor) {
                checkout.user = await this.userService.UserModel.findOne({ studentId: body.purchasedFor }).exec();
                if (!checkout.user)
                    throw new BadRequestException(req.user.defaultLang === Lang.en ? 'please enter correct student id' : 'لا يوجد طالب بالكود الموجود');
            
            }else{
                checkout.user = new ObjectId(req.user.id)
            }

            checkout.course = await this.courseService.findOne(req, course['_id']);
            checkout.price = checkout.course.price;

            checkout.valueDate = Date.now();
            checkout.priceBeforeDiscount = checkout.price;

            checkout.discount
            if (promotion) {
                checkout.discount = (checkout.priceBeforeDiscount * promotion.discountPercent / 100);
                checkout.priceAfterDiscount = checkout.priceBeforeDiscount - checkout.discount;

            } else {
                checkout.priceAfterDiscount = checkout.priceBeforeDiscount;
            }

            if (checkout.course.startDate < Date.now())
                throw new BadRequestException(req?.user?.defaultLang === Lang.en ? "can not purchace started course" : "لا يمكن شراء كورس بدأ بالفعل");

            let checkoutSaved = await this.CheckoutModel.create(checkout);

            checkout.course['enrolled'] = await this.CheckoutModel.count({ course: new ObjectId(checkout.course['_id'].toString()) }).exec()
            await this.courseService.CourseModel.updateOne({ _id: checkout.course['_id'] }, course);
            await this.userService.createWalletForCheckout(checkoutSaved);



        this.noticeService.sendSpecificNotification(
            {
                userId: req.user.id,
                notification: {
                    title: req.user.defaultLang === Lang.en ? `Successfull Subscription` : `تم الاشتراك بنجاح`,
                    body: req.user.defaultLang === Lang.en ? `your subscription is successfull to coursse ${course.name} with teacher ${course.teacher.name} with amount ${checkout.priceAfterDiscount}` :
                       `تم الاشتراك بنجاح في دورة ${course.name} مع المدرس ${course.teacher.name} بمبلغ ${checkout.priceAfterDiscount}` 
                },
                data:{
                    entityType: 'Course',
                    entityId: course['_id'].toString()
                }
            }
        )

       
        this.noticeService.sendSpecificNotification(
            {
                userId: course.teacher['_id'].toString(),
                notification: {
                    title: course.teacher.defaultLang === Lang.en ? `new Subscription` : `لديــك اشتــراك جديــد`,
                    body: course.teacher.defaultLang === Lang.en ? `you have a new subscription ${course.name} with amount ${checkout.priceAfterDiscount}` :
                       `لديك اشتراك جديد في دورة ${course.name} بمبلغ ${checkout.priceAfterDiscount}`
                },
                data:{
                    entityType: 'Course',
                    entityId: course['_id'].toString()
                }
            }
        )

            checkouts.push(checkout)
        }

        //TODO Payment


        let user = await this.userService.findOne(req.user.id);
        user.cart = [];
        await this.userService.update(req.user.id, user)

        return checkouts
    }

}