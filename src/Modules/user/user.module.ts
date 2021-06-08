import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../Models/user.model';
import { Teacher, TeacherSchema } from '../../Models/teacher.model';
import { Student, StudentSchema } from '../../Models/student.model';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory:  async () => {
          const schema = UserSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
      {
        name: Teacher.name,
        useFactory:  async () => {
          const schema = TeacherSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
      {
        name: Student.name,
        useFactory:  async () => {
          const schema = StudentSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
