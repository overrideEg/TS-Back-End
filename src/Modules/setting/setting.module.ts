import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Setting, SettingSchema } from '../../database-models/setting.model';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Setting.name,
        useFactory: async () => {
          const schema = SettingSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [SettingController],
  providers: [SettingService],
  exports: [SettingService],
})
export class SettingModule {}
