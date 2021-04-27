import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Localized } from '../shared/localized';
import { ApiProperty } from '@nestjs/swagger';
import { Stage } from './stage.model';
export type GradeDocument = Grade & Document;
@Schema()
export class Grade extends OBaseEntity {
    @ApiProperty({ type: () => Localized })
    @Prop({ type: () => Localized })
    name: Localized;
    @ApiProperty()
    @Prop()
    gradeNumber: number;
    @ApiProperty({ type: () => Stage })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Stage.name })
    stage?: Stage;
}
export const GradeSchema = SchemaFactory.createForClass(Grade);