import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { PartnerController } from './partner.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Partner, PartnerSchema } from '../../models/partner.model';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Partner.name,
        useFactory: () => {
          const schema = PartnerSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ])
  ],
  controllers: [PartnerController],
  providers: [PartnerService],
  exports:[PartnerService]
})
export class PartnerModule { }
