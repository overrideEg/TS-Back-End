import { forwardRef, Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../Models/user.model';
import { Checkout, CheckoutSchema } from '../../Models/checkout.model';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';
import { Teacher, TeacherSchema } from '../../Models/teacher.model';
import { TeacherModule } from '../teacher/teacher.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Checkout.name,
        useFactory: async () => {
          const schema = CheckoutSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
      
    ]),
    forwardRef(()=>TeacherModule),
    forwardRef(()=>CourseModule),
    forwardRef(()=>UserModule),
    
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
  exports: [CheckoutService],
})
export class CheckoutModule { }
