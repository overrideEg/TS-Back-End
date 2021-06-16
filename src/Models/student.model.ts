import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Grade } from './grade.model';
import { Stage } from './stage.model';
import { City } from './city.model';
import { User } from './user.model';
import { OverrideUtils } from '../shared/override-utils';
import { ApiProperty } from '@nestjs/swagger';
export type StudentDocument = Student & Document;
@Schema()
export class Student extends OBaseEntity {

    @ApiProperty()
    @Prop({default: (Math.random()*100000).toFixed(0)})
    studentId: string;

    @ApiProperty({type:()=>City})

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: City.name ,autopopulate: true})
    city?: City;

    @ApiProperty({type:()=>Stage})

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Stage.name ,autopopulate: true})
    stage?: Stage;
    @ApiProperty({type:()=>Grade})

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Grade.name,autopopulate: true })
    grade?: Grade;

    @ApiProperty({ type: () => User })
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user?: User;
    

}
export const StudentSchema = SchemaFactory.createForClass(Student);