import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeacherProfile } from '../../dtos/teacher-profile.dto';
import { Checkout, CheckoutDocument } from '../../Models/checkout.model';
import { Course, CourseDocument } from '../../Models/course.model';
import { Teacher, TeacherDocument } from '../../Models/teacher.model';
import { UserService } from '../user/user.service';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class TeacherService {


    constructor(
        @InjectModel(Teacher.name) private TeacherModel: Model<TeacherDocument>,
        @InjectModel(Course.name) private CourseModel: Model<CourseDocument>,
        @InjectModel(Checkout.name) private CheckoutModel: Model<CheckoutDocument>,
        private userService: UserService
    ) { }
    async save(req: Teacher) {
        let saved = await this.TeacherModel.create(req);
        return saved;
    }

    async findAll(): Promise<Teacher[]> {
        let teachers = await this.TeacherModel.find().exec();
        for await (let teacher of teachers) {
            teacher.user = await this.userService.findByTeacher(teacher['_id'])
        }
        return teachers
    }


    async getTeacherProfile(id: string): Promise<TeacherProfile> {
        let teacher = await this.TeacherModel.findById(id).exec();
        let user = await this.userService.findByTeacher(teacher['_id']);
        let courses = await this.CourseModel.find({ teacher: teacher }).sort({ createdAt: 'desc' }).exec();
        for await (const course of courses) {
            course.teacher = teacher;
            course.teacher.user = user;
            course.related = [];
            course.related = course.related.slice(0, 6);
            let progress = 0;
            let videos = 0;
            course.enrolled = Number((Math.random() * 100).toFixed(0))
            course.content.forEach(cont => {
                let contentProgress = 0;
                cont.lessons.forEach(less => {
                    less.type.toString() === 'video' ? videos += 1 : videos += 0;
                    less.type.toString() === 'video' && less.isDone ? contentProgress += 1 : contentProgress += 0;
                });
                progress += contentProgress;
            });
            course.progress = progress / videos * 100;
            for await (let review of course.reviews) {
                review.user = await this.userService.UserModel.findOne(review.user).exec()
            }
            course['cRating'] = course.reviews.length == 0 ? 5 : course.reviews.reduce((acc, review) => acc + review.stars, 0) / course.reviews.length;
        }
        let profile = new TeacherProfile();
        profile.bio = teacher.bio;
        profile.courses = courses;
        profile.noOfCourses = courses.length;
        profile.name = user.name;
        profile.userId = user['_id'];
        profile.avatar = user['avatar'] ?? '';
        profile.rate = courses.reduce((acc, course) => acc + course.cRating, 0) / courses.length;
        profile.noOfStudents = await this.CheckoutModel.countDocuments().populate({
            "path": "lines.course",
            'model': Course.name
        }).populate({
            path: 'lines.course.teacher',
            "match": new ObjectId(teacher['_id'].toString())
        });
        return profile;
    }
    async findOne(id: string): Promise<Teacher> {
        let teacher = await this.TeacherModel.findById(id).exec();
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