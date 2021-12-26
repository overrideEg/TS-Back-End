import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Lang } from '../shared/enums/lang.enum';
import { Course } from './course/course.model';
import { ApiProperty } from '@nestjs/swagger';
import { City } from './city.model';
import { Grade } from './grade.model';
import { Stage } from './stage.model';
import { StudentReview } from './student-review.model';
import { BankAccount } from './bank-account.model';
import { Wallet } from './wallet-model';

export enum UserType {
  admin = 'Admin',
  student = 'Student',
  teacher = 'Teacher',
  parent = 'Parent',
}

export type UserDocument = User & Document;
@Schema()
export class User extends OBaseEntity {
  @Prop()
  name?: string;
  @Prop()
  email?: string;

  @Prop({ default: false })
  isActive?: boolean;

  @Prop({ default: false })
  teacherApproved?: boolean;

  @Prop({ unique: true })
  phone?: string;
  @Prop()
  password?: string;

  @Prop()
  avatar?: string;
  @Prop({ enum: [Lang.en, Lang.ar], default: Lang.en })
  defaultLang?: Lang;
  @Prop({ default: '12345' })
  tempCode?: string;
  @Prop({
    enum: [UserType.admin, UserType.parent, UserType.student, UserType.teacher],
    default: UserType.student,
  })
  userType?: UserType;

  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: 'Course', autopopulate: true },
  ])
  cart?: Course[];

  @ApiProperty({ type: () => City })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: City.name,
    autopopulate: true,
  })
  city?: City;

  //student
  @ApiProperty()
  @Prop({ default: (Math.random() * 100000).toFixed(0) })
  studentId: string;
  @ApiProperty({ type: () => Stage })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Stage.name,
    autopopulate: true,
  })
  stage?: Stage;
  @ApiProperty({ type: () => Grade })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Grade.name,
    autopopulate: true,
  })
  grade?: Grade;
  @ApiProperty({ type: () => StudentReview, isArray: true })
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: StudentReview.name,
      autopopulate: true,
    },
  ])
  studentReviews?: StudentReview[];

  //teacher
  @ApiProperty()
  @Prop()
  additionalPhone?: string;
  @ApiProperty()
  @Prop()
  resume?: string;
  @ApiProperty()
  @Prop()
  coverletter?: string;
  @ApiProperty()
  @Prop()
  bio?: string;
  @ApiProperty({ type: Number })
  @Prop()
  cRating?: number;

  @ApiProperty({ type: () => Wallet, isArray: true })
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Wallet.name,
      autopopulate: true,
    },
  ])
  wallet?: Wallet[];

  @ApiProperty({ type: () => BankAccount, isArray: true })
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: BankAccount.name,
      autopopulate: true,
    },
  ])
  bankAccounts?: BankAccount[];

  //parent
  @ApiProperty({ type: () => User, isArray: true })
  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true },
  ])
  students?: User[];
}
export const UserSchema = SchemaFactory.createForClass(User);
