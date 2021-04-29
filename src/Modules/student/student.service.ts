import { Injectable } from '@nestjs/common';


import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from '../../Models/student.model';
import { UserService } from '../user/user.service';
@Injectable()
export class StudentService {
   
    constructor(
        @InjectModel(Student.name) private StudentModel: Model<StudentDocument>,
        private userService: UserService
    ) { }
    async save(req: Student) {
        let saved = await this.StudentModel.create(req);
        return saved;
    }

    findByStudentId( studentId: string) {
        return this.StudentModel.findOne({studentId: studentId}).lean().exec();
    }
    async findAll(): Promise<Student[]> {
        let students = await this.StudentModel.find().exec();
        for await (let student of students) {
            student.user = await this.userService.findByStudent(student['_id'])['_doc']
        }
        return students;
    }
    async findOne(id: string): Promise<Student> {
        let student = await this.StudentModel.findById(id).exec();
        student.user = await this.userService.findByStudent(student['_id'])['_doc']

        return student;
    }
    async update(id: string, req: Student): Promise<Student> {
        return await this.StudentModel.findByIdAndUpdate(id, req);
    }
    async remove(id: string): Promise<Student> {
        return await this.StudentModel.findByIdAndRemove(id);
    }
}