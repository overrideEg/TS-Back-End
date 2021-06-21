import { forwardRef, Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from '../../Models/course.model';
import { UserModule } from '../user/user.module';
import { CheckoutModule } from '../checkout/checkout.module';
import * as mongoose from 'mongoose';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Course.name,
        useFactory: () => {
          const schema = CourseSchema;
          schema.plugin(require('mongoose-autopopulate'));

          schema.pre('init', async function (course) {
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
          })

          return schema;
        },
      },

     
      
    ]),
    
    forwardRef(()=>UserModule),

    forwardRef(()=>CheckoutModule)
  ],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService],
})
export class CourseModule { }
