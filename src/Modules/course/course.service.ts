import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LessonType } from '../../enums/lesson-type.enum';
import { PaymentStatus } from '../../enums/payment-method.enum';
import { Course, CourseDocument } from '../../models/course/course.model';
import { CourseContent, CourseContentDocument } from '../../models/course/sub-models/course-content.model';
import { CourseReview, CourseReviewDocument } from '../../models/course/sub-models/course-review.model';
import { Excercice, ExcerciceDocument } from '../../models/course/sub-models/excercice.model';
import { Lesson, LessonDocument } from '../../models/course/sub-models/lesson.model';
import { UserType } from '../../models/user.model';
import { Lang } from '../../shared/enums/lang.enum';
import { OverrideUtils } from '../../shared/override-utils';
import { CheckoutService } from '../checkout/checkout.service';
import { UserService } from '../user/user.service';
const ObjectId = require('mongoose').Types.ObjectId;
@Injectable()
export class CourseService {





    constructor(
        @InjectModel(Course.name) public CourseModel: Model<CourseDocument>,
        // @InjectModel(CourseContent.name) public CourseContentModel: Model<CourseContentDocument>,
        // @InjectModel(CourseReview.name) public CourseReviewModel: Model<CourseReviewDocument>,
        // @InjectModel(Excercice.name) public ExcerciceModel: Model<ExcerciceDocument>,
        // @InjectModel(Lesson.name) public LessonModel: Model<LessonDocument>,
        @Inject(forwardRef(() => UserService)) private userService: UserService,
        @Inject(forwardRef(() => CheckoutService)) private checkoutService: CheckoutService,
    ) { }


    async newCourse(req: any, body: Course): Promise<Course | PromiseLike<Course>> {
        if (req.user.userType !== UserType.teacher) {
            throw new BadRequestException('only teacher can add courses');
        }
        body.teacher = req.user;
        // TODO: Send Notification To Adnmin And Teacher
        return this.CourseModel.create(body)
    }
    async update(req: any, id: string, body: Course): Promise<Course | PromiseLike<Course>> {
        if (req.user.userType !== UserType.teacher) {
            throw new BadRequestException('only teacher can update courses');
        }
        let teacher = await this.userService.findOne(req.user._id);
        if (teacher['_id'].toString() !== req.user._id) {
            throw new BadRequestException('only teacher can update his courses');
        }
       
        await this.CourseModel.updateOne({ _id: id }, body).exec();
        return await this.findOne(req, id);
    }

    async delete(req: any, id: string): Promise<Course | PromiseLike<Course>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can update courses');
        }
        let teacher = await this.userService.findOne(req.user._id);
        if (teacher['_id'].toString() !== req.user._id) {
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




    async reviewCourse(req: any, courseId: string, body: CourseReview): Promise<CourseReview[] | PromiseLike<CourseReview[]>> {
        let course = await this.CourseModel.findById(courseId).exec()
        body.user = new ObjectId(req.user._id)
        course.reviews === null ? course.reviews = [body] : course.reviews.push(body);
        course['cRating'] = course['reviews'].length == 0 ? 5 : course['reviews'].reduce((acc, review) => acc + review.stars, 0) / course['reviews'].length;
        await this.CourseModel.updateOne({ _id: course['_id'] }, course).exec();
        return (await this.CourseModel.findById(courseId).exec()).reviews;
    }



    async findOne(req: any, id: string): Promise<Course | PromiseLike<Course>> {
        let course = await this.CourseModel.findById(id).exec();

        let reservations = await this.checkoutService.CheckoutModel.find({ course: new ObjectId(id), paymentStatus: PaymentStatus.Paid });

        // course.inCart = req.user._id != null ? await this.userService.UserModel.exists({
        //     $and: [
        //         { _id: new ObjectId(req.user._id) },
        //         { cart: new ObjectId(id) },
        //     ]
        // }) : false;


        // course.purchased = req.user._id != null ? await this.checkoutService.CheckoutModel.exists({ $and: [{ course: new ObjectId(id) }, { user: new ObjectId(req.user._id) }, { paymentStatus: PaymentStatus.Paid }] }) : false;
        let teacherCourses = await this.CourseModel.find({ teacher: course.teacher });
        // course.teacher['cRating'] = teacherCourses.length > 0 ? teacherCourses.reduce((acc, course) => acc + course.cRating, 0) / teacherCourses?.length : 5;
        let related = await this.CourseModel.find({
            $or: [
                { subject: course.subject ? course.subject['_id'] : null },
                { teacher: course.teacher['_id'] ?? '' },
                { grade: course.grade['_id'] ?? '' },
          ],
            _id: { $ne: course['_id'] }
        }).exec();

        for await (const rel of related) {
            rel.teacher.wallet = []
            rel.days = [];
        }



        course['related'] = [];
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
      
        course.teacher.wallet = [];
        course.teacher.bankAccounts = [];
        course.reviews.forEach((rev) => {
            if (rev.user != null) {
                rev.user.studentReviews = []; 
            }
        })

        return course;
    }

    async findById(id: string): Promise<Course | PromiseLike<Course>> {
        let course = await this.CourseModel.findById(id).exec();
        delete course.teacher.wallet;

        // course.related = await this.CourseModel.find({
        //     $or: [
        //         { subject: course.subject ? course.subject['_id'] : null },
        //         { teacher: course.teacher['_id'] ?? null },
        //         { grade: course.grade['_id'] ?? null },
        //      ],
        //     _id: { $ne: course['_id'] }
        // });
        // course.related = course.related.slice(0, 6);
        return course;
    }

    async getTeacherCourses(req: any): Promise<Course[] | PromiseLike<Course[]>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can view this request');
        }
        let teacher = await this.userService.findOne(req.user._id);
        delete teacher.wallet;
        let courses = [];

        return courses;
    }


    async getCoursesInDate
        (req: any, timeStamp: number): Promise<Course[] | PromiseLike<Course[]>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can view this request');
        }
        let teacher = await this.userService.findOne(req.user._id);
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
        let purchased = [];
        if (req.user.userType === UserType.parent) {

            let parent = await this.userService.findOne(req.user._id);
            for await (const student of parent.students) {
                purchased.push(await this.checkoutService.CheckoutModel.find({ user: student, paymentStatus: PaymentStatus.Paid }).sort({ 'valueDate': 'desc' }).exec());

            }
        }
        purchased = await this.checkoutService.CheckoutModel.find({ user: new ObjectId(req.user._id), paymentStatus: PaymentStatus.Paid }).sort({ 'valueDate': 'desc' }).exec();


        return purchased.map((checkout) => checkout.course);
    }



    async applyExcercice(req: any, courseId: string, lessonId: string, body: string[]): Promise<Excercice[] | PromiseLike<Excercice[]>> {
        let checkout = await this.checkoutService.CheckoutModel.findOne({ course: new ObjectId(courseId), user: new ObjectId(req.user._id), paymentStatus: PaymentStatus.Paid })
        if (!checkout)
            throw new BadRequestException('you dont purchased this course')
        let course = checkout.course;
        delete course.teacher.wallet;
    
        return  null;
        // if (lesson.type === LessonType.excercice) {
        //     for await (const link of body) {
        //         let excersise = new Excercice();
        //         excersise.user = await this.userService.findOne(req.user._id)
        //         excersise.link = link;
        //         lesson.exersices == null ? lesson.exersices = [excersise] : lesson.exersices.push(excersise)
        //     }
        //     await this.CourseModel.updateOne({ _id: courseId }, course)
        // }
        // return lesson.exersices ?? [];
    }


    async getExcercices(req: any, courseId: string, lessonId: string): Promise<Excercice[] | PromiseLike<Excercice[]>> {
        let course = await this.CourseModel.findById(courseId);
    
        return  []
    }


    /**
     * calculateProgress
     */
    // public calculateProgress(course: Course) {
    //     let progress = 0;
    //     let videos = 0;
    //     course.content.forEach(cont => {
    //         let contentProgress = 0;
    //         cont.lessons.forEach(less => {
    //             less.type.toString() === 'video' ? videos += 1 : videos += 0;
    //             less.type.toString() === 'video' && less.isDone ? contentProgress += 1 : contentProgress += 0;
    //         });
    //         progress += contentProgress;
    //     });
    //     return videos === 0 ? 0 : progress / videos * 100;
    // }
}