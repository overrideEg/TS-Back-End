import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentHome, TeacherHome } from '../../dtos/home.dto';
import { Course, CourseDocument } from '../../Models/course.model';
import { BannerService } from '../banner/banner.service';
import { PartnerService } from '../partner/partner.service';
import { UserService } from '../user/user.service';
const ObjectId = require('mongoose').Types.ObjectId;
import * as moment from 'moment';
import { SubjectService } from '../subject/subject.service';
import { Checkout, CheckoutDocument } from '../../Models/checkout.model';
import { OverrideUtils } from '../../shared/override-utils';
import { TeacherProfile } from '../../dtos/teacher-profile.dto';
import { CourseService } from '../course/course.service';
import { CheckoutService } from '../checkout/checkout.service';
@Injectable()
export class HomeService {

    constructor(
        private bannerService: BannerService,
        private partnerService: PartnerService,
        private userService: UserService,
        private subjectService: SubjectService,
        private courseService :CourseService,
        private checkoutService: CheckoutService
    ) { }
    async getStudentHome(req: any): Promise<StudentHome | PromiseLike<StudentHome>> {

        let home = new StudentHome();
        home.banners = await this.bannerService.findAll();

        home.partners = await this.partnerService.findAll();
        let featuresCourses = await this.courseService.CourseModel.find().sort({ 'cRating': 'desc' }).limit(20).exec();

        for await (const course of featuresCourses) {
            course.inCart = await this.userService.UserModel.exists({ _id: new ObjectId(req.user.id), cart: new ObjectId(course['_id'].toString()) })
        }
        home.featuresCourses = featuresCourses;
        let addedRecently = await this.courseService.CourseModel.find().sort({ 'createdAt': 'desc' }).limit(20).exec();
        for await (const course of addedRecently) {
            course.inCart = await this.userService.UserModel.exists({ _id: new ObjectId(req.user.id), cart: new ObjectId(course['_id'].toString()) })
        }
        home.addedRecently = addedRecently;
        let now = moment();
        let afterWeek = moment();
        afterWeek.add(1, 'week');

        let startSoon = await this.courseService.CourseModel.find({ startDate: { $gte: now.unix() * 1000, $lte: afterWeek.unix() * 1000 } }).limit(20).exec();
        for await (const course of startSoon) {
            course.inCart = await this.userService.UserModel.exists({ _id: new ObjectId(req.user.id), cart: new ObjectId(course['_id'].toString()) })
        }

        home.startSoon = startSoon;
        home.subjects = await this.subjectService.findAll();
        home.topInstructors = []
        for await (const course of featuresCourses) {

            let profile = new TeacherProfile();
            course.teacher = await this.userService.findByTeacher(course.teacher['_id']);
            profile.name = course.teacher.name;
            profile.avatar = course.teacher.avatar ?? "";
            let teacherCourses = await this.courseService.CourseModel.find({ teacher: course.teacher });
            profile.noOfStudents = await this.checkoutService.CheckoutModel.countDocuments().populate({
                "path": "lines.course",
                'model': Course.name
            }).populate({
                path: 'lines.course.teacher',
                "match": new ObjectId(course.teacher['_id'].toString())
            });
            profile.noOfCourses = teacherCourses.length
            profile.rate = teacherCourses.length > 0 ? teacherCourses.reduce((acc, course) => acc + course.cRating, 0) / teacherCourses?.length : 5;
            profile.bio = course.teacher?.bio ?? course.teacher.name;
            profile.userId = course.teacher['_id']
            profile.teacherId = course.teacher['_id']
            home.topInstructors.push(profile);
        }

        return home;
    }


    async getTeacherHome(req: any): Promise<TeacherHome | PromiseLike<TeacherHome>> {
        let home = new TeacherHome()
        let user = await this.userService.findOne(req.user.id);

        let teacherCourses = await this.courseService.CourseModel.find({ teacher: user }).exec();
        home.noOfCourses = teacherCourses.length
        home.rate = teacherCourses.length > 0 ? teacherCourses.reduce((acc, course) => acc + course.cRating, 0) / teacherCourses?.length : 5;
        let feedbacks = [];


        let registers = await this.checkoutService.CheckoutModel.countDocuments().populate({
            "path": "lines.course",
            'model': Course.name
        }).populate({
            path: 'lines.course.teacher',
            "match": new ObjectId(user['_id'].toString())
        });
        // registers = registers.filter(data=>data.lines.find(line=>line.course.teacher['_id'].toString() === user.teacher['_id'].toString()));
        home.noOfStudents = registers;

        for await (const course of teacherCourses) {
            course.reviews.forEach(rev => {
                feedbacks.push(rev)
            });
        }

        home.latestFeedback = feedbacks.sort((a, b) => (a.time > b.time) ? -1 : ((b.time > a.time) ? 1 : 0));
        home.latestFeedback = home.latestFeedback.slice(0, 5)


        for await (const feedback of home.latestFeedback) {
            feedback.user = await this.userService.findOne(String(feedback.user))
        }
        let todayCourses = teacherCourses;
        todayCourses =  todayCourses.filter(course => {
            let today = course.Days.find(day =>  OverrideUtils.dayOffDay(day)  === new Date().getDay());
            let notFinished = course.content.find(content => content.lessons.find(lesson => lesson.isDone == false || lesson.isDone == null || lesson.isDone == undefined));
            return today  && notFinished 
        })
        home.todayCourses = todayCourses;
        return home
    }

}
