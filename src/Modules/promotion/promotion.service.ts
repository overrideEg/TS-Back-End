import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Promotion, PromotionDocument } from '../../Models/promotion.model';
@Injectable()
export class PromotionService {

    constructor(
        @InjectModel(Promotion.name) public PromotionModel: Model<PromotionDocument>
    ) { }

    async save(req: Promotion) {
        let saved = await this.PromotionModel.create(req);
        return saved;
    }

    async findAll(): Promise<Promotion[]> {
        return this.PromotionModel.find().exec();
    }
    async findOne(id: string): Promise<Promotion> {
        return this.PromotionModel.findById(id).exec();
    }

    async update(id: string, req: Promotion): Promise<Promotion> {
        await this.PromotionModel.findByIdAndUpdate(id, req)
        return this.findOne(id);
    }
    async remove(id: string): Promise<Promotion> {
        return await this.PromotionModel.findByIdAndRemove(id);
    }
}