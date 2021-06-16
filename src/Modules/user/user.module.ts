import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../Models/user.model';
import { CourseModule } from '../course/course.module';
import { CheckoutModule } from '../checkout/checkout.module';

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
 
    forwardRef(() => CheckoutModule),
    forwardRef(() => CourseModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
