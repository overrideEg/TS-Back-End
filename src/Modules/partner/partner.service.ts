import { Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partner, PartnerDocument } from '../../models/partner.model';
@Injectable()
export class PartnerService {
  constructor(
    @InjectModel(Partner.name) private PartnerModel: Model<PartnerDocument>,
  ) {}
  private readonly log = new Logger(PartnerService.name);
  async save(req: Partner) {
    let saved = await this.PartnerModel.create(req);
    return saved;
  }
  async findAll(): Promise<Partner[]> {
    return this.PartnerModel.find().exec();
  }
  async findOne(id: string): Promise<Partner> {
    return this.PartnerModel.findById(id).exec();
  }
  async update(id: string, req: Partner): Promise<Partner> {
    await this.PartnerModel.findByIdAndUpdate(id, req);
    return this.findOne(id);
  }
  async remove(id: string): Promise<Partner> {
    return await this.PartnerModel.remove({ _id: id });
  }
}
