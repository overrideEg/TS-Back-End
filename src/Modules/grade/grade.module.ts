import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Grade, GradeSchema } from '../../Models/grade.model';

@Module({
  imports:[
   
    MongooseModule.forFeatureAsync([
      {
        name: Grade.name,
        useFactory: () => {
          const schema = GradeSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [GradeController],
  providers: [GradeService]
})
export class GradeModule {}
