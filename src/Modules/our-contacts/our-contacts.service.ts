import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OurContacts, OurContactsDocument } from '../../Models/our-contacts';
@Injectable()
export class OurContactsService {
    constructor(
        @InjectModel(OurContacts.name) private OurContactsModel: Model<OurContactsDocument>
    ) { }
    async save(req: OurContacts) {
        let exists =  await this.OurContactsModel.findOne({}).exec();
        let saved ;
        if (exists) {
            saved = await this.OurContactsModel.findByIdAndUpdate(exists._id, req)
        }
        else {
            saved = this.OurContactsModel.create(req)
        }
        return saved;
    }
    async findAll(): Promise<OurContacts> {
        return this.OurContactsModel.findOne().exec() ?? {};
    }
    async findOne(id: string): Promise<OurContacts> {
        return this.OurContactsModel.findById(id).exec();
    }
    async update(id: string, req: OurContacts): Promise<OurContacts> {
        await this.OurContactsModel.findByIdAndUpdate(id, req)
        return this.findOne(id);
    }
    async remove(id: string): Promise<OurContacts> {
        return await this.OurContactsModel.findByIdAndRemove(id);
    }
}