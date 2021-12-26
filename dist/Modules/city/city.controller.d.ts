import { City } from '../../models/city.model';
import { CityService } from './city.service';
export declare class CityController {
    private service;
    constructor(service: CityService);
    saveCity(req: City): Promise<City>;
    getAllCitys(): Promise<City[]>;
    findOne(id: string): Promise<City>;
    updateCity(id: string, req: City): Promise<any>;
    deleteCity(id: string): Promise<any>;
}
