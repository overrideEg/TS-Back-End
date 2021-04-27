import { Module } from '@nestjs/common';
import { BannerService } from './banner.service';
import { BannerController } from './banner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Banner, BannerSchema } from '../../Models/banner.model';

@Module({
  imports:[
    MongooseModule.forFeature([{name: Banner.name,schema: BannerSchema}])
  ],
  controllers: [BannerController],
  providers: [BannerService]
})
export class BannerModule {}
