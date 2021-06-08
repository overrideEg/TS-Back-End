import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { Lang } from '../shared/enums/lang.enum';
import { Student } from './student.model';
import { Teacher } from './teacher.model';
import { Parent } from './parent.model';

export enum UserType {
    admin = 'Admin',
    student = 'Student',
    teacher = 'Teacher',
    parent = 'Parent'
}

export type UserDocument = User & Document;
@Schema()
export class User extends OBaseEntity {
    @Prop()
    name?: string;
    @Prop()
    email?: string;
    
    @Prop({ default: false })
    isActive?: boolean;

    @Prop({ unique: true })
    phone?: string;
    @Prop()
    password?: string;
    @Prop([String])
    fcmTokens?: Array<string>;

    @Prop()
    avatar?: string
    @Prop({ enum: [Lang.en, Lang.ar], default: Lang.en })
    defaultLang?: Lang;
    @Prop({ default: '12345' })
    tempCode?: string;
    @Prop({ enum: [UserType.admin, UserType.parent, UserType.student, UserType.teacher], default: UserType.student })
    userType?: UserType;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Student' ,autopopulate: true})
    student?: Student;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Teacher.name ,autopopulate: true})
    teacher?: Teacher;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Parent.name ,autopopulate: true})
    parent?: Parent;
}
export const UserSchema = SchemaFactory.createForClass(User);
