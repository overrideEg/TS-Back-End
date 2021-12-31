import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Grade } from '../grade.model';
import { Day } from '../../shared/enums/day.enum';
import { Subject } from '../subject.model';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { User } from '../user.model';
import { Localized } from '../../shared/localized';
import { CourseReview } from './sub-models/course-review.model';
import { CourseType } from '../../enums/course-type.enum';
import { OFile } from '../../api-modules/file/entities/file.entity';
import { Status } from '../../enums/status.enum';
import { Excercice } from './sub-models/excercice.model';
import { AttendanceLog } from '../learning-class.model';

export const random = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export type CourseDocument = Course & Document;
@Schema({
  timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  skipVersioning: true,
})
export class Course {
  @ApiProperty({ type: String })
  _id?: any;

  @ApiProperty({ description: 'createdAt', required: true })
  @Prop({})
  createdAt?: number;

  @ApiProperty({ description: 'updatedAt', required: true })
  @Prop({})
  updatedAt?: string;

  @ApiProperty({
    enum: [Status.pending, Status.approved],
    default: Status.pending,
  })
  @Prop({ enum: [Status.pending, Status.approved], default: Status.pending })
  status: Status;

  @ApiProperty({
    description: 'CourseType',
    enum: [CourseType.session, CourseType.tutorial, CourseType.home],
    default: CourseType.session,
  })
  @Prop({
    enum: [CourseType.session, CourseType.tutorial, CourseType.home],
    default: CourseType.session,
  })
  type?: CourseType;

  @ApiProperty({ type: () => Localized })
  @Prop({ type: () => Localized })
  cover?: Localized;

  @ApiProperty({ type: () => Localized })
  @Prop({ type: () => Localized })
  name?: Localized;

  @ApiProperty({ type: () => Localized })
  @Prop({ type: () => Localized })
  info?: Localized;

  @ApiProperty()
  @Prop()
  startDate?: number;

  @ApiProperty({ type: () => Localized })
  @Prop({ type: () => Localized })
  description?: Localized;

  @ApiProperty({ type: () => Grade })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Grade.name,
    autopopulate: true,
  })
  @IsNotEmpty()
  grade?: Grade;

  @ApiProperty({ type: () => Subject })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Subject.name,
    autopopulate: true,
  })
  @IsNotEmpty()
  subject?: Subject;

  @ApiProperty()
  @Prop()
  price?: number;


  @ApiProperty({
    type: () => CourseReview,
    description: 'CourseReviews',
    isArray: true,
  })
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: CourseReview.name,
      autopopulate: true,
    },
  ])
  reviews?: CourseReview[];

  @ApiProperty({ type: () => User })
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    autopopulate: true,
  })
  teacher?: User;

  @ApiProperty({
    enum: [
      Day.Friday,
      Day.Saturday,
      Day.Sunday,
      Day.Monday,
      Day.Tuesday,
      Day.Wednesday,
      Day.Thursday,
    ],
    isArray: true,
  })
  @Prop({
    enum: [
      Day.Friday,
      Day.Saturday,
      Day.Sunday,
      Day.Monday,
      Day.Tuesday,
      Day.Wednesday,
      Day.Thursday,
    ],
    type: [String],
  })
  @IsEnum(Day, { each: true })
  @IsOptional()
  days?: Day[];

  @ApiProperty()
  @Prop()
  @IsNumber()
  @IsOptional()
  hour?: number;

  @ApiProperty({ type: () => OFile, description: 'OFiles', isArray: true })
  @Prop([
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'fs.files',
      autopopulate: true,
    },
  ])
  attachements?: OFile[];

  @ApiProperty({
    type: () => Excercice,
    description: 'Excercices',
    isArray: true,
  })
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Excercice.name }])
  excercices?: Excercice[];



  @Prop()
  liveStartTime?: number;
  @Prop()
  liveEndTime?: number;

  @Prop()
  attenders: number;

  @Prop()
  teacherToken?: string;

  @Prop()
  studentToken?: string;

  @Prop([AttendanceLog])
  attendanceLogs?: AttendanceLog[];

}
export const CourseSchema = SchemaFactory.createForClass(Course);
CourseSchema.index({
  '$**': 'text',
});
