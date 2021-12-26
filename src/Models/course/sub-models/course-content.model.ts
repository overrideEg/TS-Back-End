import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../../../shared/base-entity';
import { Lesson } from './lesson.model';
import { ApiProperty } from '@nestjs/swagger';
export type CourseContentDocument = CourseContent & Document;
@Schema({
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    skipVersioning: true
})
export class CourseContent extends OBaseEntity {
    @ApiProperty()
    @Prop()
    chapter: string

    @ApiProperty( {  type : () => Lesson,description: 'Lessons', isArray:true})
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Lesson.name, autopopulate: true }])
    lessons?: Lesson[];
}
export const CourseContentSchema = SchemaFactory.createForClass(CourseContent);