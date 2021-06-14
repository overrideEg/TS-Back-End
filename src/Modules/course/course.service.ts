import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { RtcRole, RtcTokenBuilder } from 'agora-access-token';
import { Model } from 'mongoose';
import { Checkout, CheckoutDocument } from '../../Models/checkout.model';
import { Course, CourseContent, CourseDocument, CourseReview, LessonType } from '../../Models/course.model';
import { UserType } from '../../Models/user.model';
import { OverrideUtils } from '../../shared/override-utils';
import { Agora } from '../auth/Security/constants';
import { CheckoutService } from '../checkout/checkout.service';
import { TeacherService } from '../teacher/teacher.service';
import { UserService } from '../user/user.service';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class CourseService {




    constructor(
        @InjectModel(Course.name) public CourseModel: Model<CourseDocument>,
        private userService: UserService,
        @InjectModel(Checkout.name) public CheckoutModel: Model<CheckoutDocument>,

    ) { }


    async newCourse(req: any, body: Course): Promise<Course | PromiseLike<Course>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can add courses');
        }
        let teacher = (await this.userService.findOne(req.user.id)).teacher;
        body['teacher'] = teacher;
        body['createdAt'] = Date.now()

        return this.CourseModel.create(body)
    }
    async update(req: any, id: string, body: Course): Promise<Course | PromiseLike<Course>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can update courses');
        }
        let teacher = await this.userService.findOne(req.user.id);
        if (teacher['_id'].toString() !== req.user.id) {
            throw new BadRequestException('only teacher can update his courses');
        }
        //TODO:
        await this.CourseModel.updateOne({ _id: id }, body).exec();
        return await this.CourseModel.findById(id).exec();
    }

    async delete(req: any, id: string): Promise<Course | PromiseLike<Course>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can update courses');
        }
        let teacher = await this.userService.findOne(req.user.id);
        if (teacher['_id'].toString() !== req.user.id) {
            throw new BadRequestException('only teacher can update his courses');
        }
        let course = await this.CourseModel.findById(id).exec();
        if (course.startDate < Date.now()) {
            throw new BadRequestException('you can not delete started course');
        }

        return await this.CourseModel.findByIdAndDelete(id);
    }

  


    async addCourseContent(req: any, courseId: string, contents: CourseContent[]): Promise<CourseContent[] | PromiseLike<CourseContent[]>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can add courses');
        }
        let teacher = (await this.userService.findOne(req.user.id)).teacher;
        let course = await this.CourseModel.findById(courseId).exec()
        if (course.teacher['_id'].toString() !== teacher['_id'].toString())
            throw new BadRequestException('only teacher can add his content');
        contents.forEach(content => {
            content.OId = OverrideUtils.generateGUID();
            content.lessons.forEach(lesson => lesson['OId'] = OverrideUtils.generateGUID());
        })
        course.content = contents;
        await this.CourseModel.updateOne({ _id: course['_id'] }, course).exec();
        return course.content;
    }

    async reviewCourse(req: any, courseId: string, body: CourseReview): Promise<CourseReview[] | PromiseLike<CourseReview[]>> {
        let course = await this.CourseModel.findById(courseId).exec()
        body.OId = OverrideUtils.generateGUID();
        body.user = new ObjectId(req.user.id)
        body.time = Date.now()
        course.reviews === null ? course.reviews = [body] : course.reviews.push(body);
        await this.CourseModel.updateOne({ _id: course['_id'] }, course).exec();
        return (await this.CourseModel.findById(courseId).exec()).reviews;
    }
    async findOne(req: any, id: string): Promise<Course | PromiseLike<Course>> {
        let course = await this.CourseModel.findById(id).exec();

        let reservations = await this.CheckoutModel.find().populate({
            "path": "lines.course",
            'model': Course.name,
            "match": new ObjectId(course['_id'].toString())
        }).populate('user')

        
        course.teacher.user = await this.userService.findByTeacher(course.teacher['_id']);

        course.inCart = await this.userService.UserModel.exists({ _id: new ObjectId(req.user.id), cart: new ObjectId(course['_id'].toString()) })
        course.related = await this.CourseModel.find({
            $or: [
                { subject: course.subject ? course.subject['_id'] : null },
                { teacher: course.teacher['_id'] ?? '' },
                { grade: course.grade['_id'] ?? '' },
                { stage: course.stage['_id'] ?? '' }],
            _id: { $ne: course['_id'] }
        });
        let students = []

        for await (const res of reservations) {
            let user = await this.userService.findOne(res.user['_id'].toString())
            students.push({
                name : user?.name,
                _id : user['_id'],
                stage : user.student?.stage,
                grade : user.student?.grade,
            })
        }
        course.students = students
        
        course.related = course.related.slice(0, 6);
        return course;
    }

    async findById( id: string): Promise<Course | PromiseLike<Course>> {
        let course = await this.CourseModel.findById(id).exec();
        course.teacher.user = await this.userService.findByTeacher(course.teacher['_id']);
        course.related = await this.CourseModel.find({
            $or: [
                { subject: course.subject ? course.subject['_id'] : null },
                { teacher: course.teacher['_id'] ?? '' },
                { grade: course.grade['_id'] ?? '' },
                { stage: course.stage['_id'] ?? '' }],
            _id: { $ne: course['_id'] }
        });
        course.related = course.related.slice(0, 6);
        return course;
    }

    async getTeacherCourses(req: any): Promise<Course[] | PromiseLike<Course[]>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can view this request');
        }
        let teacher = (await this.userService.findOne(req.user.id))?.teacher;
        let courses = [];
        if (teacher) {
            courses = await this.CourseModel.find({ teacher: teacher['_id'] }).exec();
        }
        return courses;
    }
    async getStudentCourses(req: any): Promise<Course[] | PromiseLike<Course[]>> {
        let purchased = await this.CheckoutModel.find({ user: new ObjectId(req.user.id) }).sort({ 'valueDate': 'desc' }).exec();
        let courses = []
        for await (const check of purchased) {
            
        for await (const line of check.lines) {
            courses.push(await this.findById(line.course['_id'].toString()))
        }
        }
       
        
    


       return courses;
    }


}