import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stage, StageDocument } from '../../models/stage.model';
@Injectable()
export class StageService {
  constructor(
    @InjectModel(Stage.name) private StageModel: Model<StageDocument>,
  ) {}
  async save(req: Stage) {
    let saved = await await this.StageModel.create(req);
    return saved;
  }
  async findAll(): Promise<Stage[]> {
    return this.StageModel.find().exec();
  }
  async findOne(id: string): Promise<Stage> {
    return this.StageModel.findById(id).exec();
  }
  async update(id: string, req: Stage): Promise<Stage> {
    await this.StageModel.findByIdAndUpdate(id, req);
    return this.findOne(id);
  }
  async remove(id: string): Promise<Stage> {
    return await this.StageModel.findByIdAndRemove(id);
  }
}
