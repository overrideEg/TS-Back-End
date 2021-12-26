import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Localized } from '../shared/localized';
import { LocationModel } from '../shared/location.model';
import { OBaseEntity } from '../shared/base-entity';
export declare type CityDocument = City & Document;
export declare class City extends OBaseEntity {
    name: Localized;
    loc: LocationModel;
}
export declare const CitySchema: mongoose.Schema<Document<City, any, any>, mongoose.Model<Document<City, any, any>, any, any, any>, any>;
