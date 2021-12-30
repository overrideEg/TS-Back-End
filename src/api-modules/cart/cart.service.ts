import { Injectable } from '@nestjs/common';
import { Course } from '../../database-models/course/course.model';
import { UserService } from '../user/user.service';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class CartService {
  constructor(private userService: UserService) {}

  async addToCart(
    req: any,
    courseId: string,
  ): Promise<Course[] | PromiseLike<Course[]>> {
    await this.userService.UserModel.findByIdAndUpdate(req.user._id, {
      $addToSet: { cart: new ObjectId(courseId) },
    }).exec();
    return this.myCart(req);
  }

  async deleteFromCart(
    req: any,
    courseId: string,
  ): Promise<Course[] | PromiseLike<Course[]>> {
    await this.userService.UserModel.findByIdAndUpdate(req.user._id, {
      $pull: { cart: new ObjectId(courseId) },
    });
    return this.myCart(req);
  }

  async myCart(req: any): Promise<Course[] | PromiseLike<Course[]>> {
    return await this.userService.UserModel.aggregate([
      {
        $match: {
          $and: [{ _id: new ObjectId(req.user._id) }],
        },
      },
      {
        $lookup: {
          from: 'courses',
          localField: 'cart',
          foreignField: '_id',
          as: 'cart',
        },
      },

      { $unwind: '$cart' },

      {
        $replaceRoot: {
          newRoot: '$cart',
        },
      },
      {
        $lookup: {
          from: 'coursereviews',
          localField: 'reviews',
          foreignField: '_id',
          as: 'reviews',
        },
      },
    

      {
        $unset: [
          'attachements',
          'days',
          'reviews.user',
          'hour',
          'excercices',
          'startDate',
          'grade',
          'subject',
          'teacher',
        ],
      },
    ]);
  }
}
