import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from '../../Models/subject.model';

@Module({
  imports:[
    
    MongooseModule.forFeatureAsync([
      {
        name: Subject.name,
        useFactory: () => {
          const schema = SubjectSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [SubjectController],
  providers: [SubjectService]
})
export class SubjectModule {}
