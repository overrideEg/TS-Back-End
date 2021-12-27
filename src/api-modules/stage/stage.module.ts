import { Module } from '@nestjs/common';
import { StageService } from './stage.service';
import { StageController } from './stage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stage, StageSchema } from '../../database-models/stage.model';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Stage.name,
        useFactory: () => {
          const schema = StageSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [StageController],
  providers: [StageService],
})
export class StageModule {}
