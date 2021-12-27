import { Module } from '@nestjs/common';
import { OnBoardingService } from './on-boarding.service';
import { OnBoardingController } from './on-boarding.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OnBoarding, OnBoardingSchema } from '../../database-models/on-boarding.model';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: OnBoarding.name,
        useFactory: () => {
          const schema = OnBoardingSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [OnBoardingController],
  providers: [OnBoardingService],
})
export class OnBoardingModule {}
