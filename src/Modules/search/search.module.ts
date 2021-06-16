import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { UserModule } from '../user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from '../../Models/course.model';
import { Teacher, TeacherSchema } from '../../Models/teacher.model';
import { Checkout, CheckoutSchema } from '../../Models/checkout.model';
import { CourseModule } from '../course/course.module';
import { TeacherModule } from '../teacher/teacher.module';
import { CheckoutModule } from '../checkout/checkout.module';

@Module({
  imports:[
    CourseModule,
    TeacherModule,
    CheckoutModule,
    
   
    UserModule
  ],
  controllers: [SearchController],
  providers: [SearchService]
})
export class SearchModule {}
