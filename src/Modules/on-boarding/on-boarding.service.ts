import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OnBoarding, OnBoardingDocument } from '../../models/on-boarding.model';
@Injectable()
export class OnBoardingService {
  constructor(
    @InjectModel(OnBoarding.name)
    private OnBoardingModel: Model<OnBoardingDocument>,
  ) {}
  async save(req: OnBoarding) {
    let saved = await this.OnBoardingModel.create(req);
    return saved;
  }
  async findAll(): Promise<OnBoarding[]> {
    return this.OnBoardingModel.find().sort({ priority: 'asc' }).exec();
  }
  async findOne(id: string): Promise<OnBoarding> {
    return this.OnBoardingModel.findById(id).exec();
  }
  async update(id: string, req: OnBoarding): Promise<OnBoarding> {
    await this.OnBoardingModel.findByIdAndUpdate(id, req);
    return this.findOne(id);
  }
  async remove(id: string): Promise<OnBoarding> {
    return await this.OnBoardingModel.findByIdAndRemove(id);
  }
}
