import { Module } from '@nestjs/common';
import { OnBoardingService } from './on-boarding.service';
import { OnBoardingController } from './on-boarding.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OnBoarding, OnBoardingSchema } from '../../Models/on-boarding.model';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name: OnBoarding.name,schema: OnBoardingSchema
    }])
  ],
  controllers: [OnBoardingController],
  providers: [OnBoardingService]
})
export class OnBoardingModule {}
