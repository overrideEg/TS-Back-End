import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Student } from './student.model';
import { ApiProperty } from '@nestjs/swagger';
export type ParentDocument = Parent & Document;
@Schema()
export class Parent extends OBaseEntity {
    @ApiProperty({type:()=>Student,isArray:true})
    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: Student.name }])
    students?: Student[];
}
export const ParentSchema = SchemaFactory.createForClass(Parent);