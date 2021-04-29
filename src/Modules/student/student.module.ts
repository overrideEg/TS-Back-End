import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from '../../Models/student.model';
import { UserModule } from '../user/user.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: Student.name,schema: StudentSchema}
    ]),
    UserModule
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
