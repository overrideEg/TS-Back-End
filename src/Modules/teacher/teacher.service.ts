import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from '../../Models/teacher.model';
@Injectable()
export class TeacherService {
    constructor(
        @InjectModel(Teacher.name) private TeacherModel: Model<TeacherDocument>
    ) { }
    async save(req: Teacher) {
        let saved = await this.TeacherModel.create(req);
        return saved;
    }
    async findAll(): Promise<Teacher[]> {
        return this.TeacherModel.find().exec();
    }
    async findOne(id: string): Promise<Teacher> {
        return this.TeacherModel.findById(id).exec();
    }
    async update(id: string, req: Teacher): Promise<Teacher> {
        return await this.TeacherModel.findByIdAndUpdate(id, req);
    }
    async remove(id: string): Promise<Teacher> {
        return await this.TeacherModel.findByIdAndRemove(id);
    }
}