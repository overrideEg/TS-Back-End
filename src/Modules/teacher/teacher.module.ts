import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from '../../Models/teacher.model';
import { UserModule } from '../user/user.module';
import { Course, CourseSchema } from '../../Models/course.model';
import { Checkout, CheckoutSchema } from '../../Models/checkout.model';

@Module({
  imports: [
    
    MongooseModule.forFeatureAsync([
      {
        name: Teacher.name,
        useFactory: () => {
          const schema = TeacherSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
      {
        name: Course.name,
        useFactory: () => {
          const schema = CourseSchema;
          schema.plugin(require('mongoose-autopopulate'));

          schema.pre('updateOne', async function (next) {
            let course = this;
            course = course['_update']
            course['cRating'] = course['reviews'].length == 0 ? 5 : course['reviews'].reduce((acc, review) => acc + review.stars, 0) / course['reviews'].length;
            let progress = 0;
            let videos = 0;
            course['content'].forEach(cont => {
              let contentProgress = 0;
              cont.lessons.forEach(less => {
                less.type.toString() === 'video' ? videos += 1 : videos += 0;
                less.type.toString() === 'video' && less.isDone ? contentProgress += 1 : contentProgress += 0;
              });
              progress += contentProgress;
            });
            course['progress'] = videos === 0 ? 0 : progress / videos * 100;
            course['enrolled'] = Number((Math.random() * 100).toFixed(0))

            next();
          })

          return schema;
        },
      },
      {
        name: Checkout.name,
        useFactory: () => {
          const schema = CheckoutSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
    UserModule
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule { }
