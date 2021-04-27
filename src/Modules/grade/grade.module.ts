import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Grade, GradeSchema } from '../../Models/grade.model';

@Module({
  imports:[
    MongooseModule.forFeature(
      [
        {name: Grade.name,schema:GradeSchema}
      ]
    )
  ],
  controllers: [GradeController],
  providers: [GradeService]
})
export class GradeModule {}
