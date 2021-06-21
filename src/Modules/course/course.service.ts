import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseContent, CourseDocument, CourseReview, Excercice, LessonType, random } from '../../Models/course.model';
import { UserType } from '../../Models/user.model';
import { OverrideUtils } from '../../shared/override-utils';
import { CheckoutService } from '../checkout/checkout.service';
import { UserService } from '../user/user.service';
const ObjectId = require('mongoose').Types.ObjectId;
@Injectable()
export class CourseService {





    constructor(
        @InjectModel(Course.name) public CourseModel: Model<CourseDocument>,
        @Inject(forwardRef(() => UserService)) private userService: UserService,
        @Inject(forwardRef(() => CheckoutService)) private checkoutService: CheckoutService
    ) { }


    async newCourse(req: any, body: Course): Promise<Course | PromiseLike<Course>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can add courses');
        }
        let teacher = await this.userService.findOne(req.user.id);
        body['teacher'] = teacher;
        body['createdAt'] = Date.now()

        if (body.content){
            body.content.forEach(content => {
                content.OId = OverrideUtils.generateGUID();
                content.lessons.forEach(lesson => {
                    lesson['OId'] = OverrideUtils.generateGUID();
                    lesson.uId = random(100,99999);
                    lesson.isDone = false
                });
            })
        }
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
        // let reservations = await this.checkoutService.CheckoutModel.find().populate({
        //     "path": "lines.course",
        //     'model': Course.name,
        //     "match": new ObjectId(course['_id'].toString())
        // }).populate('user')
        // if (reservations.length>0){
        //     throw new BadRequestException(`you have ${reservations.length}  reservation on your course you can't delete`);
        // }
    

        return await this.CourseModel.findByIdAndDelete(id);
    }




    async addCourseContent(req: any, courseId: string, contents: CourseContent[]): Promise<CourseContent[] | PromiseLike<CourseContent[]>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can add courses');
        }
        let teacher = await this.userService.findOne(req.user.id);
        let course = await this.CourseModel.findById(courseId).exec()
        if (course.teacher['_id'].toString() !== teacher['_id'].toString())
            throw new BadRequestException('only teacher can add his content');
        contents.forEach(content => {
            content.OId = OverrideUtils.generateGUID();
            content.lessons.forEach(lesson => {
                lesson['OId'] = OverrideUtils.generateGUID();
                lesson.uId = random(100,99999);
                lesson.isDone = false

            });
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

        let reservations = await this.checkoutService.CheckoutModel.find().populate({
            "path": "lines.course",
            'model': Course.name,
            "match": new ObjectId(course['_id'].toString())
        }).populate('user')

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
                name: user?.name,
                _id: user['_id'],
                stage: user?.stage,
                grade: user?.grade,
            })
        }
        for await (const rev of course.reviews) {
            rev.user = await this.userService.findOne(rev.user['_id'])
        }
        course.students = students

        course.related = course.related.slice(0, 6);
        return course;
    }

    async findById(id: string): Promise<Course | PromiseLike<Course>> {
        let course = await this.CourseModel.findById(id).exec();
        course.related = await this.CourseModel.find({
            $or: [
                { subject: course.subject ? course.subject['_id'] : null },
                { teacher: course.teacher['_id'] ?? null },
                { grade: course.grade['_id'] ?? null },
                { stage: course.stage['_id'] ?? null }],
            _id: { $ne: course['_id'] }
        });
        course.related = course.related.slice(0, 6);
        return course;
    }

    async getTeacherCourses(req: any): Promise<Course[] | PromiseLike<Course[]>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can view this request');
        }
        let teacher = await this.userService.findOne(req.user.id);
        let courses = [];
        if (teacher) {
            courses = await this.CourseModel.find({ teacher: teacher['_id'] }).exec();
        }
        return courses;
    }


    async getCoursesInDate
        (req: any, timeStamp: number): Promise<Course[] | PromiseLike<Course[]>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can view this request');
        }
        let teacher = await this.userService.findOne(req.user.id);
        let courses = [];
        if (teacher) {
            courses = await this.CourseModel.find({ teacher: teacher['_id'] }).exec();
        }


        let dayOfWeek = new Date(timeStamp).getDay()
        courses = courses.filter(course => {
            let today = course.Days.find(day => OverrideUtils.dayOffDay(day) === dayOfWeek);
            let notFinished = course.content.find(content => content.lessons.find(lesson => lesson.isDone == false || lesson.isDone == null || lesson.isDone == undefined));
            return today && notFinished
        })

        return courses;
    }

    async getStudentCourses(req: any): Promise<Course[] | PromiseLike<Course[]>> {
        let purchased = await this.checkoutService.CheckoutModel.find({ user: new ObjectId(req.user.id) }).sort({ 'valueDate': 'desc' }).exec();
        

        return purchased.map((checkout)=>checkout.course);
    }



    async applyExcercice(req: any, courseId: string, lessonId: string, body: string[]): Promise<Excercice[] | PromiseLike<Excercice[]>> {
        let course = await this.CourseModel.findById(courseId);
        let content = course?.content?.find(content => content.lessons.find(less => less.OId === lessonId));
        let lesson = content?.lessons?.find(less => less.OId === lessonId);
        if (!course || !content || !lesson) {
            throw new BadRequestException('course Is Invalid');
        }
        if (lesson.type === LessonType.excercice) {
            for await (const link of body) {
                let excersise = new Excercice();
                excersise.oId = OverrideUtils.generateGUID()
                excersise.user = await this.userService.findOne(req.user.id)
                excersise.link = link;
                lesson.exersices == null ? lesson.exersices = [excersise] : lesson.exersices.push(excersise)
            }
            await this.CourseModel.updateOne({ _id: courseId }, course)
        }
        return lesson.exersices;
    }


    async getExcercices(req: any, courseId: string, lessonId: string): Promise<Excercice[] | PromiseLike<Excercice[]>> {
        let course = await this.CourseModel.findById(courseId);
        let content = course?.content?.find(content => content.lessons.find(less => less.OId === lessonId));
        let lesson = content?.lessons?.find(less => less.OId === lessonId);
        if (!course || !content || !lesson) {
            throw new BadRequestException('course Is Invalid');
        }
        return lesson.exersices ?? []
    }


}