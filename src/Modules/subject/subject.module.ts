import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from '../../Models/subject.model';

@Module({
  imports:[
    MongooseModule.forFeature([{
      name: Subject.name, schema: SubjectSchema
    }])
  ],
  controllers: [SubjectController],
  providers: [SubjectService]
})
export class SubjectModule {}
