import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Grade, GradeDocument } from '../../Models/grade.model';
@Injectable()
export class GradeService {
    constructor(
        @InjectModel(Grade.name) private GradeModel: Model<GradeDocument>
    ) { }
    async save(req: Grade) {
        let saved = await (await this.GradeModel.create(req)).populate('stage')
       
        return saved;
    }
    async findAll(): Promise<Grade[]> {
        return this.GradeModel.find().populate('stage').exec();
    }
    async findOne(id: string): Promise<Grade> {
        return this.GradeModel.findById(id).populate('stage').exec();
    }
    async update(id: string, req: Grade): Promise<Grade> {
         await this.GradeModel.findByIdAndUpdate(id, req);
         return this.findOne(id)
    }
    async remove(id: string): Promise<Grade> {
        return await this.GradeModel.findByIdAndRemove(id);
    }
}