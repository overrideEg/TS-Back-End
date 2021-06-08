import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Student } from './student.model';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
export type ParentDocument = Parent & Document;
@Schema()
export class Parent extends OBaseEntity {
    @ApiProperty({ type: () => Student, isArray: true })
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Student', autopopulate: true }])
    students?: Student[];

    @ApiProperty({ type: () => User })
    user?: User;
}
export const ParentSchema = SchemaFactory.createForClass(Parent);