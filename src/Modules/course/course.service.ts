import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentStatus } from '../../enums/payment-method.enum';
import { Course, CourseContent, CourseDocument, CourseReview, Excercice, LessonType, random } from '../../Models/course.model';
import { UserType } from '../../Models/user.model';
import { Lang } from '../../shared/enums/lang.enum';
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
        delete teacher.wallet;

        body['teacher'] = teacher;
        body['createdAt'] = Date.now()

        if (body.content) {
            body.content.forEach(content => {
                content.OId = OverrideUtils.generateGUID();
                content.lessons.forEach(lesson => {
                    lesson['OId'] = OverrideUtils.generateGUID();
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
        if (body.content) {
            body.content.forEach(element => {
                if (!element.OId)
                    element.OId = OverrideUtils.generateGUID();
                element.lessons.forEach(elem => {
                    elem.OId = OverrideUtils.generateGUID();
                })
            })
        }
        await this.CourseModel.updateOne({ _id: id }, body).exec();
        return await this.findOne(req, id);
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
        let orders = await this.checkoutService.CheckoutModel.exists({ course: new ObjectId(id), paymentStatus: PaymentStatus.Paid });
        if (orders) {
            throw new BadRequestException(req.user.defaultLang === Lang.en ? 'you can not delete course because you have reservations' : 'لا يمكن حذف الدورة لوجود حجوزات بها');
        }
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
                lesson.isDone = false

            });
        })
        course.content = contents;
        await this.CourseModel.updateOne({ _id: course['_id'] }, course).exec();
        delete course.teacher.wallet;
        return course.content;
    }

    async reviewCourse(req: any, courseId: string, body: CourseReview): Promise<CourseReview[] | PromiseLike<CourseReview[]>> {
        let course = await this.CourseModel.findById(courseId).exec()
        body.OId = OverrideUtils.generateGUID();
        body.user = new ObjectId(req.user.id)
        body.time = Date.now()
        course.reviews === null ? course.reviews = [body] : course.reviews.push(body);
        course['cRating'] = course['reviews'].length == 0 ? 5 : course['reviews'].reduce((acc, review) => acc + review.stars, 0) / course['reviews'].length;
        await this.CourseModel.updateOne({ _id: course['_id'] }, course).exec();

        return (await this.CourseModel.findById(courseId).exec()).reviews;
    }



    async findOne(req: any, id: string): Promise<Course | PromiseLike<Course>> {
        let course = await this.CourseModel.findById(id).exec();

        let reservations = await this.checkoutService.CheckoutModel.find({ course: new ObjectId(id), paymentStatus: PaymentStatus.Paid });

        course.inCart = req.user.id != null ? await this.userService.UserModel.exists({
            $and: [
                { _id: new ObjectId(req.user.id) },
                { cart: new ObjectId(id) },
            ]
        }) : false;


        course.purchased = req.user.id != null ? await this.checkoutService.CheckoutModel.exists({ $and: [{ course: new ObjectId(id) }, { user: new ObjectId(req.user.id) }, { paymentStatus: PaymentStatus.Paid }] }) : false;
        let teacherCourses = await this.CourseModel.find({ teacher: course.teacher });
        course.teacher['cRating'] = teacherCourses.length > 0 ? teacherCourses.reduce((acc, course) => acc + course.cRating, 0) / teacherCourses?.length : 5;
        let related = await this.CourseModel.find({
            $or: [
                { subject: course.subject ? course.subject['_id'] : null },
                { teacher: course.teacher['_id'] ?? '' },
                { grade: course.grade['_id'] ?? '' },
                { stage: course.stage['_id'] ?? '' }],
            _id: { $ne: course['_id'] }
        }).exec();

        for await (const rel of related) {
            rel.teacher.wallet = []
            rel.content = [];
            rel.Days = [];
            rel.students = [];
        }
       


        course.related = [];
        let students = []



        for await (const res of reservations) {
            students.push({
                name: res.user?.name,
                _id: res.user['_id'],
                stage: res.user?.stage,
                grade: res.user?.grade,
            })
        }
        for await (const rev of course.reviews) {
            rev.user = await this.userService.findOne(rev.user['_id'])
        }
        course.students = students
        course.related = course.related.slice(0, 3);
        course.enrolled = reservations.length;
        course.progress = this.calculateProgress(course);
         course.teacher.wallet = [];
         course.teacher.bankAccounts = [];

        return course;
    }

    async findById(id: string): Promise<Course | PromiseLike<Course>> {
        let course = await this.CourseModel.findById(id).exec();
        delete course.teacher.wallet;

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
        delete teacher.wallet;
        let courses = [];
        if (teacher) {
            courses = await this.CourseModel.find({ teacher: teacher['_id'] }).exec();
            courses.forEach(course => {
                course['progress'] = this.calculateProgress(course);
            })
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

        courses.forEach(course => {
            course.progress = this.calculateProgress(course);
        })
        return courses;
    }

    async getStudentCourses(req: any): Promise<Course[] | PromiseLike<Course[]>> {
        let purchased = [];
        if (req.user.userType === UserType.parent) {

            let parent = await this.userService.findOne(req.user.id);
            for await (const student of parent.students) {
                purchased.push(await this.checkoutService.CheckoutModel.find({ user: student, paymentStatus: PaymentStatus.Paid }).sort({ 'valueDate': 'desc' }).exec());

            }
        }
        purchased = await this.checkoutService.CheckoutModel.find({ user: new ObjectId(req.user.id), paymentStatus: PaymentStatus.Paid }).sort({ 'valueDate': 'desc' }).exec();

        purchased.forEach(checkout => {
            checkout.course.progress = this.calculateProgress(checkout.course);
            delete checkout.course.teacher.wallet;

        })
        return purchased.map((checkout) => checkout.course);
    }



    async applyExcercice(req: any, courseId: string, lessonId: string, body: string[]): Promise<Excercice[] | PromiseLike<Excercice[]>> {
        let checkout = await this.checkoutService.CheckoutModel.findOne({ course: new ObjectId(courseId), user: new ObjectId(req.user.id), paymentStatus: PaymentStatus.Paid })
        if (!checkout)
            throw new BadRequestException('you dont purchased this course')
        let course = checkout.course;
        delete course.teacher.wallet;
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
        return lesson.exersices ?? [];
    }


    async getExcercices(req: any, courseId: string, lessonId: string): Promise<Excercice[] | PromiseLike<Excercice[]>> {
        let course = await this.CourseModel.findById(courseId);
        delete course.teacher.wallet;
        let content = course?.content?.find(content => content.lessons.find(less => less.OId === lessonId));
        let lesson = content?.lessons?.find(less => less.OId === lessonId);
        if (!course || !content || !lesson) {
            throw new BadRequestException('course Is Invalid');
        }
        return lesson.exersices ?? []
    }


    /**
     * calculateProgress
     */
    public calculateProgress(course: Course) {
        let progress = 0;
        let videos = 0;
        course.content.forEach(cont => {
            let contentProgress = 0;
            cont.lessons.forEach(less => {
                less.type.toString() === 'video' ? videos += 1 : videos += 0;
                less.type.toString() === 'video' && less.isDone ? contentProgress += 1 : contentProgress += 0;
            });
            progress += contentProgress;
        });
        return videos === 0 ? 0 : progress / videos * 100;
    }
}