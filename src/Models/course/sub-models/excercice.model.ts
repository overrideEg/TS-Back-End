import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../../../shared/base-entity';
import { User } from '../../user.model';
import { ApiProperty } from '@nestjs/swagger';
export type ExcerciceDocument = Excercice & Document;
@Schema({
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
    skipVersioning: true
})
export class Excercice extends OBaseEntity {
    @ApiProperty({ type: () => User, readOnly: true })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true })
    user?: User;
    @ApiProperty({ description: 'link', required: true })
    @Prop()
    link?: string;
}
export const ExcerciceSchema = SchemaFactory.createForClass(Excercice);