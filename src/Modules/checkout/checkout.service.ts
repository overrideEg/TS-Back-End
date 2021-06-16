import { BadRequestException, forwardRef, Inject, Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckoutDTO } from '../../dtos/checkout-dto';
import { TransactionStatus, TransactionType } from '../../enums/wallet.enum';
import { Checkout, CheckoutDocument, CheckoutLine } from '../../Models/checkout.model';
import { Teacher, TeacherDocument, Wallet } from '../../Models/teacher.model';
import { OverrideUtils } from '../../shared/override-utils';
import { CourseService } from '../course/course.service';
import { UserService } from '../user/user.service';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class CheckoutService {


    constructor(
        @InjectModel(Checkout.name) public CheckoutModel: Model<CheckoutDocument>,
        @InjectModel(Teacher.name) public TeacherModel: Model<TeacherDocument>,
        private courseService: CourseService,
        private userService: UserService
    ) { }

    private readonly log = new Logger(CheckoutService.name);

    async save(req: Checkout) {
        let saved = await this.CheckoutModel.create(req);
        return saved;
    }

    async checkAndPay(req, body: CheckoutDTO): Promise<Checkout | PromiseLike<Checkout>> {
        let checkout = new Checkout();

        checkout.user = new ObjectId(req.user.id)

        //TODO promocode check
        checkout.lines = []
        for await (const course of body.courses) {
            let line = new CheckoutLine();
            line.course = await this.courseService.findOne(req, course['_id']);
            line.price = line.course.price;
            // TODO  if (line.course.startDate < Date.now())
            // throw new BadRequestException("can not purchace started course");
            checkout.lines.push(line)
        }

        //TODO Payment
        checkout.valueDate = Date.now();
        checkout.priceBeforeDiscount = checkout.lines.reduce((acc, line) => acc + line.price, 0);


        let checkoutSaved = await this.CheckoutModel.create(checkout);


        for await (const line of checkout.lines) {
            let wallet = new Wallet()
            wallet.date = Date.now()
            wallet.oId = OverrideUtils.generateGUID()
            wallet.type = TransactionType.in;
            wallet.status = TransactionStatus.approved;
            wallet.value = line.price
            wallet.checkoutId = checkoutSaved['_id']
            line.course.teacher.wallet.push(wallet);
            await this.TeacherModel.updateOne({_id: line.course.teacher['_id']},line.course.teacher)
            // TODO send notification to teacher
        }

        let user = await this.userService.findOne(req.user.id);
        user.cart = [];
        await this.userService.update(req.user.id, user)

        return checkoutSaved
    }

}