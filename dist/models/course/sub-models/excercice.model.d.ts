import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../../../shared/base-entity';
import { User } from '../../user.model';
export declare type ExcerciceDocument = Excercice & Document;
export declare class Excercice extends OBaseEntity {
    user?: User;
    link?: string;
}
export declare const ExcerciceSchema: mongoose.Schema<Document<Excercice, any, any>, mongoose.Model<Document<Excercice, any, any>, any, any, any>, any>;
