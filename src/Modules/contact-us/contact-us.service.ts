import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactUs, ContactUsDocument } from '../../models/contact-us.model';
@Injectable()
export class ContactUsService {
  constructor(
    @InjectModel(ContactUs.name)
    private ContactUsModel: Model<ContactUsDocument>,
  ) {}
  async save(req: ContactUs) {
    let saved = await this.ContactUsModel.create(req);
    return saved;
  }
  async findAll(): Promise<ContactUs[]> {
    return this.ContactUsModel.find().exec();
  }
  async findOne(id: string): Promise<ContactUs> {
    return this.ContactUsModel.findById(id).exec();
  }
  async update(id: string, req: ContactUs): Promise<ContactUs> {
    await this.ContactUsModel.findByIdAndUpdate(id, req);
    return this.findOne(id);
  }
  async remove(id: string): Promise<ContactUs> {
    return await this.ContactUsModel.findByIdAndRemove(id);
  }
}
