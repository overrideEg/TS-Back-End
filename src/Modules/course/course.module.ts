import { forwardRef, Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from '../../models/course/course.model';
import { UserModule } from '../user/user.module';
import { CheckoutModule } from '../checkout/checkout.module';
import * as mongoose from 'mongoose';
import {
  CourseReview,
  CourseReviewSchema,
} from '../../models/course/sub-models/course-review.model';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Course.name,
        useFactory: () => {
          const schema = CourseSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
      {
        name: CourseReview.name,
        useFactory: () => {
          const schema = CourseReviewSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),

    forwardRef(() => UserModule),

    forwardRef(() => CheckoutModule),
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule {}
