import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Banner, BannerSchema } from '../../Models/banner.model';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([
      {
        name: Banner.name,
        useFactory: () => {
          const schema = BannerSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [BannerController],
  providers: [BannerService]
})
export class BannerModule {}
