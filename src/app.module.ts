import { CacheModule, Module, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

import { FileModule } from './Modules/file/file.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './shared/logger.middleware';
import { AuthModule } from './Modules/auth/auth.module';
import { UserModule } from './Modules/user/user.module';
import { CityModule } from './Modules/city/city.module';
import { StageModule } from './Modules/stage/stage.module';
import { GradeModule } from './Modules/grade/grade.module';
import { TeacherModule } from './Modules/teacher/teacher.module';
import { StudentModule } from './Modules/student/student.module';
import { OnBoardingModule } from './Modules/on-boarding/on-boarding.module';
import { BannerModule } from './Modules/banner/banner.module';
import { SubjectModule } from './Modules/subject/subject.module';
import { PromotionModule } from './Modules/promotion/promotion.module';
import { OurContactsModule } from './Modules/our-contacts/our-contacts.module';
const overrideMoules = [
  FileModule,
  AuthModule,
  UserModule,
  CityModule,
  StageModule,
  GradeModule,
  TeacherModule,
  StudentModule,
  OnBoardingModule,
  BannerModule,
  SubjectModule,
  PromotionModule,
  OurContactsModule
]
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/ts-academy',{

    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    CacheModule.register(),
    ScheduleModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),

    ...overrideMoules
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    }

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
