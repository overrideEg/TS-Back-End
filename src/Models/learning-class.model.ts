import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Course } from './course/course.model';
import { User } from './user.model';
import { Lesson } from './course/sub-models/lesson.model';
export class AttendanceLog {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name , autopopulate: true})
    user?: User;

    @Prop({})
    time?: number;
}

export class ChatMessage {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name, autopopulate: true })
    user?: User;

    @Prop({})
    time?: number;

    @Prop({})
    message?: string;
}
export type LearningClassDocument = LearningClass & Document;
@Schema()
export class LearningClass extends OBaseEntity {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Course.name, autopopulate: true })
    course?: Course;

    @Prop({ type: () => Lesson })
    lesson?: Lesson;

    @Prop()
    startTime?: number;
    @Prop()
    endTime?: number;
    
    @Prop()
    attenders: number

    @Prop()
    teacherToken?: string;

    @Prop()
    studentToken?: string;

    @Prop([AttendanceLog])
    attendanceLogs?: AttendanceLog[];

    @Prop([ChatMessage])
    chat?: ChatMessage[];
}
export const LearningClassSchema = SchemaFactory.createForClass(LearningClass);