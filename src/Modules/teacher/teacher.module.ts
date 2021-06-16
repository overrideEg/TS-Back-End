import { forwardRef, Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from '../../Models/teacher.model';
import { UserModule } from '../user/user.module';
import { Course, CourseSchema } from '../../Models/course.model';
import { Checkout, CheckoutSchema } from '../../Models/checkout.model';
import { CheckoutModule } from '../checkout/checkout.module';
import { CourseModule } from '../course/course.module';

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
      
     
    ]),
    forwardRef(() => CheckoutModule),
    forwardRef(() => CourseModule),
  
    forwardRef(() => UserModule),

    
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule { }
