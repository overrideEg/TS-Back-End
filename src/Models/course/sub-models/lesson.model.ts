import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../../../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { LessonType } from '../../../enums/lesson-type.enum';
import { Excercice } from './excercice.model';
import { OFile } from '../../../Modules/file/entities/file.entity';
export type LessonDocument = Lesson & Document;
@Schema({
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    skipVersioning: true
})
export class Lesson extends OBaseEntity {

    @ApiProperty()
    @Prop()
    name: string;

    @ApiProperty({ enum: [LessonType.excercice, LessonType.video] })
    @Prop({ enum: [LessonType.video, LessonType.excercice] })
    type: LessonType;

    @ApiProperty( { description: 'OFile', nullable: true ,type : () => OFile })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: OFile.name, autopopulate: true })
    attachement?: OFile;

    @ApiProperty({ type: () => Excercice, description: 'Excercices', isArray: true })
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Excercice.name }])
    excercices?: Excercice[];

    @ApiProperty()
    @Prop({ default: false })
    isDone: boolean;
}
export const LessonSchema = SchemaFactory.createForClass(Lesson);