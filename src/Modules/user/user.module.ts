import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../Models/user.model';
import { Teacher, TeacherSchema } from '../../Models/teacher.model';
import { Student, StudentSchema } from '../../Models/student.model';
import { TeacherModule } from '../teacher/teacher.module';
import { StudentModule } from '../student/student.module';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: async () => {
          const schema = UserSchema;

       
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
    forwardRef(() => TeacherModule),
    forwardRef(() => StudentModule),
    forwardRef(() => CourseModule),

  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
