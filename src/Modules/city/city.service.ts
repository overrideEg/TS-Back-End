import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { City, CityDocument } from '../../database-models/city.model';
@Injectable()
export class CityService {
  constructor(@InjectModel(City.name) private CityModel: Model<CityDocument>) {}
  async save(req: City) {
    let saved = await this.CityModel.create(req);
    return saved;
  }
  async findAll(): Promise<City[]> {
    return this.CityModel.find().exec();
  }
  async findOne(id: string): Promise<City> {
    return this.CityModel.findById(id).exec();
  }
  async update(id: string, req: City): Promise<City> {
    return await this.CityModel.findByIdAndUpdate(id, req);
  }
  async remove(id: string): Promise<City> {
    return await this.CityModel.findByIdAndRemove(id);
  }
}
