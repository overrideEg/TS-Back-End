import { forwardRef, HttpModule, Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../Models/user.model';
import { Checkout, CheckoutSchema } from '../../Models/checkout.model';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';
import { PromotionModule } from '../promotion/promotion.module';
import { NoticeModule } from '../notice/notice.module';

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
    forwardRef(()=>CourseModule),
    forwardRef(()=>UserModule),
    forwardRef(()=>PromotionModule),
    
    NoticeModule,
    HttpModule
    
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
  exports: [CheckoutService],
})
export class CheckoutModule { }
