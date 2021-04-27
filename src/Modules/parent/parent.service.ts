import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parent, ParentDocument } from '../../Models/parent.model';
@Injectable()
export class ParentService {
    constructor(
        @InjectModel(Parent.name) private ParentModel: Model<ParentDocument>
    ) { }
    async save(req: Parent) {
        let saved = await this.ParentModel.create(req);
        return saved;
    }
    async findAll(): Promise<Parent[]> {
        return this.ParentModel.find().exec();
    }
    async findOne(id: string): Promise<Parent> {
        return this.ParentModel.findById(id).exec();
    }
    async update(id: string, req: Parent): Promise<Parent> {
        return await this.ParentModel.findByIdAndUpdate(id, req);
    }
    async remove(id: string): Promise<Parent> {
        return await this.ParentModel.findByIdAndRemove(id);
    }
}