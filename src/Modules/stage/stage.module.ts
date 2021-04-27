import { Module } from '@nestjs/common';
import { StageService } from './stage.service';
import { StageController } from './stage.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Stage, StageSchema } from '../../Models/stage.model';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: Stage.name,schema:StageSchema}
    ])
  ],
  controllers: [StageController],
  providers: [StageService]
})
export class StageModule {}
