import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { BannerModule } from '../banner/banner.module';
import { PartnerModule } from '../partner/partner.module';
import { UserModule } from '../user/user.module';
import { SubjectModule } from '../subject/subject.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from '../../Models/course.model';
import { Checkout, CheckoutSchema } from '../../Models/checkout.model';

@Module({
  imports:[
    BannerModule,
    PartnerModule,
    UserModule,
    SubjectModule,
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
        name: Checkout.name,
        useFactory: () => {
          const schema = CheckoutSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
     
    ]),
  ],
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}
