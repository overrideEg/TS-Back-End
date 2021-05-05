import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { TeacherController } from './teacher.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from '../../Models/teacher.model';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    
    MongooseModule.forFeatureAsync([
      {
        name: Teacher.name,
        useFactory: () => {
          const schema = TeacherSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
    UserModule
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
  exports: [TeacherService],
})
export class TeacherModule { }
