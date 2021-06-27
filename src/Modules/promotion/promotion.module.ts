import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Promotion, PromotionSchema } from '../../Models/promotion.model';

@Module({
  imports:[
    
    MongooseModule.forFeatureAsync([
      {
        name: Promotion.name,
        useFactory: () => {
          const schema = PromotionSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),

  ],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService],
})
export class PromotionModule {}
