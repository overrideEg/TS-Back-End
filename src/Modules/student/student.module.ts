import { forwardRef, Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Student, StudentSchema } from '../../Models/student.model';
import { UserModule } from '../user/user.module';

@Module({
  imports:[
  
    MongooseModule.forFeatureAsync([
      {
        name: Student.name,
        useFactory: () => {
          const schema = StudentSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
    forwardRef(()=>UserModule)
  ],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}
