import { BadRequestException, forwardRef, Inject, Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CheckoutDTO } from '../../dtos/checkout-dto';
import { Checkout, CheckoutDocument, CheckoutLine } from '../../Models/checkout.model';
import { CourseService } from '../course/course.service';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class CheckoutService {


    constructor(
        @InjectModel(Checkout.name) public CheckoutModel: Model<CheckoutDocument>,
      private courseService: CourseService
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

        return await this.CheckoutModel.create(checkout);
    }

}