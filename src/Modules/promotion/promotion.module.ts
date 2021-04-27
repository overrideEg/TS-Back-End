import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Promotion, PromotionSchema } from '../../Models/promotion.model';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: Promotion.name,schema: PromotionSchema}
    ])
  ],
  controllers: [PromotionController],
  providers: [PromotionService]
})
export class PromotionModule {}
