import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../models/user.model';
import { CourseModule } from '../course/course.module';
import { CheckoutModule } from '../checkout/checkout.module';
import { BankAccount, BankAccountSchema } from '../../models/bank-account.model';
import { Wallet, WalletSchema } from '../../models/wallet-model';
import { StudentReview, StudentReviewSchema } from '../../models/student-review.model';
import { NoticeModule } from '../notice/notice.module';

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
      {
        name: BankAccount.name,
        useFactory: async () => {
          const schema = BankAccountSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
      {
        name: Wallet.name,
        useFactory: async () => {
          const schema = WalletSchema; 
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
      {
        name: StudentReview.name,
        useFactory: async () => {
          const schema = StudentReviewSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
 
    forwardRef(() => CheckoutModule),
    forwardRef(() => CourseModule),
    forwardRef(()=>NoticeModule)

  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
