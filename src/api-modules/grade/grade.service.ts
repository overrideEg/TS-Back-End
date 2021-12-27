import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Grade, GradeDocument } from '../../database-models/grade.model';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class GradeService {
  constructor(
    @InjectModel(Grade.name) private GradeModel: Model<GradeDocument>,
  ) {}
  async save(req: Grade) {
    let saved = await await this.GradeModel.create(req);

    return saved;
  }
  async findAll(): Promise<Grade[]> {
    return this.GradeModel.find().exec();
  }
  findAllGradesByStageId(stageId: string): Promise<Grade[]> {
    return this.GradeModel.find({ stage: new ObjectId(stageId) }).exec();
  }
  async findOne(id: string): Promise<Grade> {
    return this.GradeModel.findById(id).exec();
  }
  async update(id: string, req: Grade): Promise<Grade> {
    await this.GradeModel.findByIdAndUpdate(id, req);
    return this.findOne(id);
  }
  async remove(id: string): Promise<Grade> {
    return await this.GradeModel.findByIdAndRemove(id);
  }
}
