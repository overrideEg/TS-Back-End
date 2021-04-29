import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from '../../Models/teacher.model';
import { UserService } from '../user/user.service';
@Injectable()
export class TeacherService {
    
    constructor(
        @InjectModel(Teacher.name) private TeacherModel: Model<TeacherDocument>,
        private userService: UserService
    ) { }
    async save(req: Teacher) {
        let saved = await this.TeacherModel.create(req);
        return saved;
    }
    
    async findAll(): Promise<Teacher[]> {
        let teachers = await  this.TeacherModel.find().populate('city').lean().exec();
        for await (let teacher of teachers) {
            teacher.user = await this.userService.findByTeacher(teacher['_id'])
        }
        return teachers
    }
    async findOne(id: string): Promise<Teacher> {
        let teacher = await  this.TeacherModel.findById(id).populate('city').lean().exec();
        teacher.user = await this.userService.findByTeacher(teacher['_id'])

        return teacher;
    }
    async update(id: string, req: Teacher): Promise<Teacher> {
        return await this.TeacherModel.findByIdAndUpdate(id, req);
    }
    async remove(id: string): Promise<Teacher> {
        return await this.TeacherModel.findByIdAndRemove(id);
    }
}