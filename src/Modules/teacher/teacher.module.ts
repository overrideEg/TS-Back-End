import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from '../../Models/teacher.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Teacher.name, schema: TeacherSchema
      }
    ])
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule { }
