import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { City } from './city.model';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
export type TeacherDocument = Teacher & Document;
@Schema()
export class Teacher extends OBaseEntity {
    @ApiProperty({ type: () => City })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: City.name })
    city?: City;
    @ApiProperty()
    @Prop()
    additionalPhone: string;
    @ApiProperty()
    @Prop()
    resume: string
    @ApiProperty()
    @Prop()
    coverletter: string
    @ApiProperty()
    @Prop()
    bio: string
    @ApiProperty({ type: () => User })
    user?: User;
}
export const TeacherSchema = SchemaFactory.createForClass(Teacher);