import { Injectable } from '@nestjs/common';


import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from '../../Models/student.model';
@Injectable()
export class StudentService {
   
    constructor(
        @InjectModel(Student.name) private StudentModel: Model<StudentDocument>
    ) { }
    async save(req: Student) {
        let saved = await this.StudentModel.create(req);
        return saved;
    }

    findByStudentId( studentId: string) {
        return this.StudentModel.findOne({studentId: studentId}).lean().exec();
    }
    async findAll(): Promise<Student[]> {
        return this.StudentModel.find().exec();
    }
    async findOne(id: string): Promise<Student> {
        return this.StudentModel.findById(id).exec();
    }
    async update(id: string, req: Student): Promise<Student> {
        return await this.StudentModel.findByIdAndUpdate(id, req);
    }
    async remove(id: string): Promise<Student> {
        return await this.StudentModel.findByIdAndRemove(id);
    }
}