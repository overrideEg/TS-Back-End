import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { BannerModule } from '../banner/banner.module';
import { PartnerModule } from '../partner/partner.module';
import { UserModule } from '../user/user.module';
import { SubjectModule } from '../subject/subject.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from '../../models/course/course.model';
import { Checkout, CheckoutSchema } from '../../models/checkout.model';
import { CourseModule } from '../course/course.module';
import { CheckoutModule } from '../checkout/checkout.module';

@Module({
  imports:[
    BannerModule,
    PartnerModule,
    UserModule,
    SubjectModule,
    CourseModule,
    CheckoutModule
   
  ],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}
