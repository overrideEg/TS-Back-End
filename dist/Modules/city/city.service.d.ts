import { Model } from 'mongoose';
import { City, CityDocument } from '../../models/city.model';
export declare class CityService {
    private CityModel;
    constructor(CityModel: Model<CityDocument>);
    save(req: City): Promise<City & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): Promise<City[]>;
    findOne(id: string): Promise<City>;
    update(id: string, req: City): Promise<City>;
    remove(id: string): Promise<City>;
}
