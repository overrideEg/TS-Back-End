import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Grade } from './grade.model';
import { Stage } from './stage.model';
import { Day } from '../shared/enums/day.enum';
import { Teacher } from './teacher.model';

export enum LessonType {
    video = 'video',
    excercice = 'excercice'
}
export class Lesson {
    @ApiProperty({ required: false })
    @Prop({ auto: true, type: SchemaTypes.ObjectId })
    id: any
    @ApiProperty()
    @Prop()
    name: string;
    @ApiProperty({ enum: [LessonType.excercice, LessonType.video] })
    @Prop({ enum: [LessonType.video, LessonType.excercice] })
    type: LessonType;
    @ApiProperty()
    @Prop({ required: false })
    attachement: string;
}

export class CourseContent {
    @ApiProperty({ required: false })
    @Prop({ auto: true, type: SchemaTypes.ObjectId })
    id: any
    @ApiProperty()
    @Prop()
    chapter: string
    @ApiProperty({ type: () => Lesson, isArray: true })
    @Prop([Lesson])
    lessons: Lesson[]
}
export type CourseDocument = Course & Document;
@Schema()
export class Course extends OBaseEntity {
    @ApiProperty()
    @Prop()
    createdAt: number
    @ApiProperty()
    @Prop()
    cover: string
    @ApiProperty()
    @Prop()
    name: string;
    @ApiProperty()
    @Prop()
    info: string;
    @ApiProperty()
    @Prop()
    description: string
    @ApiProperty({ type: () => Stage })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Stage.name })
    stage?: Stage;
    @ApiProperty({ type: () => Grade })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Grade.name })
    grade?: Grade;
    @ApiProperty({ enum: [Day.Friday, Day.Saturday, Day.Sunday, Day.Monday, Day.Tuesday, Day.Wednesday, Day.Thursday] })
    @Prop([Day])
    Days: Day[]
    @ApiProperty()
    @Prop()
    hour: number;
    @ApiProperty({ type: () => CourseContent, isArray: true })
    @Prop([CourseContent])
    content: CourseContent[];
    @ApiProperty({ type: () => Teacher })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Teacher.name })
    teacher?: Teacher;
    
    @ApiProperty()
    cRating = 10 - Math.random() * 10
    @ApiProperty()
    progress = 100 - Math.random() * 100
}
export const CourseSchema = SchemaFactory.createForClass(Course);