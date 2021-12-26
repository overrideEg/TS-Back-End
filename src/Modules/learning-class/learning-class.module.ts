import { Module } from '@nestjs/common';
import { LearningClassService } from './learning-class.service';
import { LearningClassGateway } from './learning-class.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningClass, LearningClassSchema } from '../../models/learning-class.model';
import { LearningClassController } from './learning-class.controller';
import { AuthModule } from '../auth/auth.module';
import { CourseModule } from '../course/course.module';
import { CheckoutModule } from '../checkout/checkout.module';
import { NoticeModule } from '../notice/notice.module';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([
      {
        name: LearningClass.name,
        useFactory: () => {
          const schema = LearningClassSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
    AuthModule,
    CheckoutModule,
    CourseModule,
    NoticeModule
  ],
  controllers: [LearningClassController],
  providers: [LearningClassGateway, LearningClassService]
})
export class LearningClassModule {}
