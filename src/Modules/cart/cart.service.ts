import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from '../../Models/course.model';
import { User, UserDocument, UserType } from '../../Models/user.model';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class CartService {
   


    constructor(
        @InjectModel(User.name) public UserModel: Model<UserDocument>
    ) { }

    async addToCart(req: any, courseId: string): Promise<Course[] | PromiseLike<Course[]>> {
        let user = await this.UserModel.findById(req.user.id).exec();

        let foundInCart = user.cart?.find(course => course['_id'].toString() === courseId);
        if (foundInCart)
            throw new BadRequestException('Course Already in cart');
        user.cart == null ? user.cart = [new ObjectId(courseId)] : user.cart.push(new ObjectId(courseId));
        await this.UserModel.updateOne({ _id: user['_id'] }, user);
        user = await this.UserModel.findById(req.user.id).exec();
        for await (let course of user.cart) {
            // course['progress'] = 100 - Math.random() * 100;
            course.enrolled = Number((Math.random() * 100).toFixed(0))

           
        }
        return user.cart;
    }


    async deleteFromCart(req: any, courseId: string): Promise<Course[] | PromiseLike<Course[]>> {
        let user = await this.UserModel.findById(req.user.id).exec();

        let foundInCart = user.cart?.find(course => course['_id'].toString() === courseId);
        if (!foundInCart)
            throw new BadRequestException('This course not in cart');
        user.cart.splice(user.cart.findIndex(course => course['_id'].toString() === courseId),1);
        await this.UserModel.updateOne({ _id: user['_id'] }, user);
        user = await this.UserModel.findById(req.user.id).exec();
        for await (let course of user.cart) {
            // course['progress'] = 100 - Math.random() * 100;

            course.enrolled = Number((Math.random() * 100).toFixed(0))

        }
        return user.cart;
    }


    async myCart(req: any): Promise<Course[] | PromiseLike<Course[]>> {
        let user = await this.UserModel.findById(req.user.id).exec();

        for await (let course of user.cart) {
            // course['progress'] = 100 - Math.random() * 100;

            course.enrolled = Number((Math.random() * 100).toFixed(0))

        }
        return user.cart;
    }
}
