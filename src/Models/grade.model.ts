import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Localized } from '../shared/localized';
import { ApiProperty } from '@nestjs/swagger';
import { Stage } from './stage.model';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
export type GradeDocument = Grade & Document;
@Schema()
export class Grade extends OBaseEntity {
    @ApiProperty({ type: () => Localized })
    @Prop({ type: () => Localized })
    @ValidateNested()
    @Type(()=>Localized)
    name: Localized;
    @ApiProperty()
    @Prop()
    @IsNumber()
    gradeNumber: number;
    @ApiProperty({ type: () => Stage })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Stage.name,autopopulate: true })
    @IsNotEmpty()
    stage?: Stage;
}
export const GradeSchema = SchemaFactory.createForClass(Grade);