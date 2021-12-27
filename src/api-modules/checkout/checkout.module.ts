import { forwardRef, Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../database-models/user.model';
import { Checkout, CheckoutSchema } from '../../database-models/checkout.model';
import { CourseModule } from '../course/course.module';
import { UserModule } from '../user/user.module';
import { PromotionModule } from '../promotion/promotion.module';
import { NoticeModule } from '../notice/notice.module';
import { HttpModule } from '@nestjs/axios';
import { PricingModule } from '../pricing/pricing.module';

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
    forwardRef(() => CourseModule),
    forwardRef(() => UserModule),
    forwardRef(() => PromotionModule),

    NoticeModule,
    HttpModule,
    PricingModule,
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
  exports: [CheckoutService],
})
export class CheckoutModule {}
