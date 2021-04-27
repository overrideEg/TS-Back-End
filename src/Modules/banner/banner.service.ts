import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner, BannerDocument } from '../../Models/banner.model';
@Injectable()
export class BannerService {
    constructor(
        @InjectModel(Banner.name) private BannerModel: Model<BannerDocument>
    ) { }
    async save(req: Banner) {
        let saved = await this.BannerModel.create(req);
        return saved;
    }
    async findAll(): Promise<Banner[]> {
        return this.BannerModel.find().sort({ priority: 'asc' }).exec();
    }
    async findOne(id: string): Promise<Banner> {
        return this.BannerModel.findById(id).exec();
    }
    async update(id: string, req: Banner): Promise<Banner> {
        await this.BannerModel.findByIdAndUpdate(id, req)
        return this.findOne(id);
    }
    async remove(id: string): Promise<Banner> {
        return await this.BannerModel.findByIdAndRemove(id);
    }
}