import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pricing, PricingDocument } from '../../models/pricing.model';

@Injectable()
export class PricingService {
  constructor(
    @InjectModel(Pricing.name) private PricingModel: Model<PricingDocument>,
  ) {}

  // save Pricing Created By Override
  async save(req: Pricing) {
    let currentPricings = await this.getCurrentPricings();
    if (currentPricings['_id']) {
      return this.update(currentPricings['_id'].toString(), req);
    }
    return await this.PricingModel.create(req);
  }

  // findAll Pricings Created By Override
  async getCurrentPricings(): Promise<Pricing> {
    let currentPricings = await this.PricingModel.findOne().exec();
    if (!currentPricings) {
      let pricing = new Pricing();
      pricing.sessionAndroidId = '';
      pricing.sessionAndroidPrice = 100;
      pricing.sessionAppleId = '';
      pricing.sessionApplePrice = 100;
      pricing.sessionWebPrice = 100;
      pricing.tutorialAndroidId = '';
      pricing.tutorialAndroidPrice = 100;
      pricing.tutorialAppleId = '';
      pricing.tutorialApplePrice = 100;

      pricing.tutorialWebPrice = 100;

      return pricing;
    }
    return currentPricings;
  }

  // findOne Pricings Created By Override
  async findOne(id: string): Promise<Pricing> {
    return this.PricingModel.findById(id).exec();
  }

  // update Pricings Created By Override
  async update(id: string, req: Pricing): Promise<Pricing> {
    await this.PricingModel.findByIdAndUpdate(id, req);
    return this.findOne(id);
  }
}
