import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from '../../Models/course.model';
import { UserModule } from '../user/user.module';

@Module({
  imports:[
    
    MongooseModule.forFeatureAsync([
      {
        name: Course.name,
        useFactory: () => {
          const schema = CourseSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
    UserModule
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule {}
