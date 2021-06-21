import { BadRequestException, forwardRef, Inject, Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckoutDTO } from '../../dtos/checkout-dto';
import { TransactionStatus, TransactionType } from '../../enums/wallet.enum';
import { Checkout, CheckoutDocument } from '../../Models/checkout.model';
import { Wallet } from '../../Models/wallet-model';
import { OverrideUtils } from '../../shared/override-utils';
import { CourseService } from '../course/course.service';
import { UserService } from '../user/user.service';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class CheckoutService {


    constructor(
        @InjectModel(Checkout.name) public CheckoutModel: Model<CheckoutDocument>,
        @Inject(forwardRef(()=>CourseService))
        private courseService: CourseService,
        @Inject(forwardRef(()=>UserService))
        private userService: UserService
    ) { }

    private readonly log = new Logger(CheckoutService.name);

    async save(req: Checkout) {
        let saved = await this.CheckoutModel.create(req);
        return saved;
    }

    async checkAndPay(req, body: CheckoutDTO): Promise<Checkout[] | PromiseLike<Checkout[]>> {


        //TODO promocode check
        let checkouts = []
        for await (const course of body.courses) {

            let checkout = new Checkout();

            checkout.user = new ObjectId(req.user.id)

            checkout.course = await this.courseService.findOne(req, course['_id']);
            checkout.price = checkout.course.price;

            checkout.valueDate = Date.now();
            checkout.priceBeforeDiscount = checkout.price;
    
    
            let checkoutSaved = await this.CheckoutModel.create(checkout);
    
            checkout.course['enrolled'] = await this.CheckoutModel.count({course: checkout.course}).exec()
            await this.courseService.CourseModel.updateOne({_id: checkout.course['_id']},course);
            await this.userService.createWalletForCheckout(checkoutSaved)

            // TODO  if (line.course.startDate < Date.now())
            // throw new BadRequestException("can not purchace started course");
            checkouts.push(checkout)
        }

        //TODO Payment
      



        let user = await this.userService.findOne(req.user.id);
        user.cart = [];
        await this.userService.update(req.user.id, user)

        return checkouts
    }

}