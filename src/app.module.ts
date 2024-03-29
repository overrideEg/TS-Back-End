import { CartModule } from './api-modules/cart/cart.module';
import {
  CacheModule,
  Module,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { FileModule } from './api-modules/file/file.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './shared/logger.middleware';
import { AuthModule } from './api-modules/auth/auth.module';
import { UserModule } from './api-modules/user/user.module';
import { CityModule } from './api-modules/city/city.module';
import { StageModule } from './api-modules/stage/stage.module';
import { GradeModule } from './api-modules/grade/grade.module';
import { OnBoardingModule } from './api-modules/on-boarding/on-boarding.module';
import { BannerModule } from './api-modules/banner/banner.module';
import { SubjectModule } from './api-modules/subject/subject.module';
import { PromotionModule } from './api-modules/promotion/promotion.module';
import { CourseModule } from './api-modules/course/course.module';
import { SearchModule } from './api-modules/search/search.module';
import { CheckoutModule } from './api-modules/checkout/checkout.module';
import { LearningClassModule } from './api-modules/learning-class/learning-class.module';
import { PartnerModule } from './api-modules/partner/partner.module';
import { HomeModule } from './api-modules/home/home.module';
import { ContactUsModule } from './api-modules/contact-us/contact-us.module';
import { NoticeModule } from './api-modules/notice/notice.module';
import { SettingModule } from './api-modules/setting/setting.module';
import { PricingModule } from './api-modules/pricing/pricing.module';
const overrideMoules = [
  FileModule,
  AuthModule,
  UserModule,
  CityModule,
  StageModule,
  GradeModule,
  OnBoardingModule,
  BannerModule,
  SubjectModule,
  PromotionModule,
  SettingModule,
  CourseModule,
  CartModule,
  SearchModule,
  CheckoutModule,
  PartnerModule,
  HomeModule,
  LearningClassModule,
  ContactUsModule,
  NoticeModule,
  PricingModule,
];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(
      `mongodb://${process.env.db_host}/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`,
      {
        dbName: 'ts-academy',
        ssl: false,
        auth: {
          username: process.env.db_user,
          password: process.env.db_pwd,
        },

        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log('DB is connected');
          });
          connection.on('disconnected', () => {
            console.log('DB disconnected');
          });
          connection.on('error', (error) => {
            console.log('DB connection failed! for error: ', error);
          });
          connection.plugin(require('mongoose-autopopulate'));
          return connection;
        },
      },
    ),

    CacheModule.register(),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 10,
      limit: 999999,
    }),

    ...overrideMoules,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes({
      path: '',
      method: RequestMethod.ALL,
    });
  }
}
