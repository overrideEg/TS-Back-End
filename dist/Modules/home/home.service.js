"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeService = void 0;
const common_1 = require("@nestjs/common");
const home_dto_1 = require("../../dtos/home.dto");
const course_model_1 = require("../../models/course/course.model");
const banner_service_1 = require("../banner/banner.service");
const partner_service_1 = require("../partner/partner.service");
const user_service_1 = require("../user/user.service");
const ObjectId = require('mongoose').Types.ObjectId;
const moment = require("moment");
const subject_service_1 = require("../subject/subject.service");
const teacher_profile_dto_1 = require("../../dtos/teacher-profile.dto");
const course_service_1 = require("../course/course.service");
const checkout_service_1 = require("../checkout/checkout.service");
const status_enum_1 = require("../../enums/status.enum");
const mongoose = require('mongoose');
let HomeService = class HomeService {
    constructor(bannerService, partnerService, userService, subjectService, courseService, checkoutService) {
        this.bannerService = bannerService;
        this.partnerService = partnerService;
        this.userService = userService;
        this.subjectService = subjectService;
        this.courseService = courseService;
        this.checkoutService = checkoutService;
    }
    async getStudentHome(req) {
        var e_1, _a;
        var _b, _c, _d, _e, _f;
        let home = new home_dto_1.StudentHome();
        home.banners = await this.bannerService.findAll();
        home.partners = await this.partnerService.findAll();
        let featuresCourses = await this.checkoutService.CheckoutModel.aggregate([
            {
                $lookup: {
                    from: 'courses',
                    localField: 'course',
                    foreignField: '_id',
                    as: 'course',
                },
            },
            { $unwind: '$course' },
            { $sortByCount: '$course' },
            {
                $replaceRoot: {
                    newRoot: '$_id',
                },
            },
            { $limit: 10 },
            {
                $lookup: {
                    from: 'grades',
                    localField: 'grade',
                    foreignField: '_id',
                    as: 'grade',
                },
            },
            { $unwind: '$grade' },
            {
                $lookup: {
                    from: 'stages',
                    localField: 'grade.stage',
                    foreignField: '_id',
                    as: 'stage',
                },
            },
            { $unwind: '$stage' },
            {
                $lookup: {
                    from: 'subjects',
                    localField: 'subject',
                    foreignField: '_id',
                    as: 'subject',
                },
            },
            { $unwind: '$subject' },
            {
                $lookup: {
                    from: 'users',
                    localField: 'teacher',
                    foreignField: '_id',
                    as: 'teacher',
                },
            },
            { $unwind: '$teacher' },
            {
                $unset: [
                    'attachements',
                    'days',
                    'reviews',
                    'grade.stage',
                    'teacher.students',
                    'teacher.bankAccounts',
                    'teacher.wallet',
                    'teacher.studentReviews',
                    'teacher.studentId',
                    'teacher.cart',
                    'teacher.userType',
                    'teacher.tempCode',
                    'teacher.defaultLang',
                    'teacher.teacherApproved',
                    'teacher.isActive',
                    'teacher.password',
                    'teacher.city',
                    'teacher.additionalPhone',
                    'teacher.coverletter',
                    'teacher.resume',
                    'teacher.email',
                    'teacher.phone',
                ],
            },
        ]);
        home.featuresCourses = featuresCourses;
        let addedRecently = await this.courseService.CourseModel.aggregate([
            {
                $lookup: {
                    from: 'grades',
                    localField: 'grade',
                    foreignField: '_id',
                    as: 'grade',
                },
            },
            { $unwind: '$grade' },
            {
                $lookup: {
                    from: 'stages',
                    localField: 'grade.stage',
                    foreignField: '_id',
                    as: 'stage',
                },
            },
            { $unwind: '$stage' },
            {
                $lookup: {
                    from: 'subjects',
                    localField: 'subject',
                    foreignField: '_id',
                    as: 'subject',
                },
            },
            { $unwind: '$subject' },
            {
                $lookup: {
                    from: 'users',
                    localField: 'teacher',
                    foreignField: '_id',
                    as: 'teacher',
                },
            },
            { $unwind: '$teacher' },
            {
                $unset: [
                    'attachements',
                    'days',
                    'reviews',
                    'grade.stage',
                    'teacher.students',
                    'teacher.bankAccounts',
                    'teacher.wallet',
                    'teacher.studentReviews',
                    'teacher.studentId',
                    'teacher.cart',
                    'teacher.userType',
                    'teacher.tempCode',
                    'teacher.defaultLang',
                    'teacher.teacherApproved',
                    'teacher.isActive',
                    'teacher.password',
                    'teacher.city',
                    'teacher.additionalPhone',
                    'teacher.coverletter',
                    'teacher.resume',
                    'teacher.email',
                    'teacher.phone',
                ],
            },
            { $sort: { createdAt: -1 } },
            { $limit: 10 },
        ]);
        home.addedRecently = addedRecently;
        let now = moment();
        let afterWeek = moment();
        afterWeek.add(1, 'week');
        let startSoon = await this.courseService.CourseModel.aggregate([
            {
                $lookup: {
                    from: 'grades',
                    localField: 'grade',
                    foreignField: '_id',
                    as: 'grade',
                },
            },
            { $unwind: '$grade' },
            {
                $lookup: {
                    from: 'stages',
                    localField: 'grade.stage',
                    foreignField: '_id',
                    as: 'stage',
                },
            },
            { $unwind: '$stage' },
            {
                $lookup: {
                    from: 'subjects',
                    localField: 'subject',
                    foreignField: '_id',
                    as: 'subject',
                },
            },
            { $unwind: '$subject' },
            {
                $lookup: {
                    from: 'users',
                    localField: 'teacher',
                    foreignField: '_id',
                    as: 'teacher',
                },
            },
            { $unwind: '$teacher' },
            {
                $unset: [
                    'attachements',
                    'days',
                    'reviews',
                    'grade.stage',
                    'teacher.students',
                    'teacher.bankAccounts',
                    'teacher.wallet',
                    'teacher.studentReviews',
                    'teacher.studentId',
                    'teacher.cart',
                    'teacher.userType',
                    'teacher.tempCode',
                    'teacher.defaultLang',
                    'teacher.teacherApproved',
                    'teacher.isActive',
                    'teacher.password',
                    'teacher.city',
                    'teacher.additionalPhone',
                    'teacher.coverletter',
                    'teacher.resume',
                    'teacher.email',
                    'teacher.phone',
                ],
            },
            {
                $match: {
                    startDate: { $gte: now.unix() * 1000, $lte: afterWeek.unix() * 1000 },
                },
            },
            { $sort: { createdAt: -1 } },
            { $limit: 10 },
        ]);
        home.startSoon = startSoon;
        home.subjects = await this.subjectService.findAll();
        home.topInstructors = [];
        try {
            for (var featuresCourses_1 = __asyncValues(featuresCourses), featuresCourses_1_1; featuresCourses_1_1 = await featuresCourses_1.next(), !featuresCourses_1_1.done;) {
                const course = featuresCourses_1_1.value;
                let profile = new teacher_profile_dto_1.TeacherProfile();
                profile.name = (_b = course === null || course === void 0 ? void 0 : course.teacher) === null || _b === void 0 ? void 0 : _b.name;
                profile.avatar = (_c = course.teacher.avatar) !== null && _c !== void 0 ? _c : '';
                profile.noOfStudents =
                    await this.checkoutService.CheckoutModel.countDocuments()
                        .populate({
                        path: 'course',
                        model: course_model_1.Course.name,
                    })
                        .populate({
                        path: 'course.teacher._id',
                        match: new ObjectId(course.teacher['_id']),
                    });
                profile.noOfCourses = await this.courseService.CourseModel.count({
                    teacher: course.teacher,
                    status: status_enum_1.Status.approved,
                });
                let latestFeedback = await this.courseService.getReviwsForTeacher(course.teacher);
                profile.noOfReviews = latestFeedback.length;
                profile.rate =
                    latestFeedback.length > 0
                        ? latestFeedback.reduce((acc, feedBack) => acc + feedBack.stars, 0) /
                            profile.noOfCourses
                        : 5;
                profile.bio = (_e = (_d = course.teacher) === null || _d === void 0 ? void 0 : _d.bio) !== null && _e !== void 0 ? _e : (_f = course === null || course === void 0 ? void 0 : course.teacher) === null || _f === void 0 ? void 0 : _f.name;
                profile.userId = course.teacher['_id'];
                if (!home.topInstructors.find((instructor) => instructor.userId.toString() === course.teacher._id.toString()))
                    home.topInstructors.push(profile);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (featuresCourses_1_1 && !featuresCourses_1_1.done && (_a = featuresCourses_1.return)) await _a.call(featuresCourses_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return home;
    }
    async getTeacherHome(req) {
        let home = new home_dto_1.TeacherHome();
        let user = await this.userService.findOne(req.user._id);
        let teacherCourses = await this.courseService.CourseModel.aggregate([
            {
                $match: {
                    $and: [
                        {
                            startDate: {
                                $gte: moment().startOf('day').unix() * 1000,
                                $lte: moment().endOf('day').unix() * 1000,
                            },
                        },
                        { teacher: new ObjectId(req.user._id) },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'grades',
                    localField: 'grade',
                    foreignField: '_id',
                    as: 'grade',
                },
            },
            { $unwind: '$grade' },
            {
                $lookup: {
                    from: 'stages',
                    localField: 'grade.stage',
                    foreignField: '_id',
                    as: 'stage',
                },
            },
            { $unwind: '$stage' },
            {
                $lookup: {
                    from: 'coursereviews',
                    localField: 'reviews',
                    foreignField: '_id',
                    as: 'reviews',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'reviews.user',
                    foreignField: '_id',
                    as: 'reviews.user',
                },
            },
            {
                $unset: [
                    'attachements',
                    'days',
                    'grade.stage',
                    'teacher',
                    'subject',
                    'reviews.user',
                ],
            },
            { $sort: { startDate: 1 } },
        ]);
        home.noOfCourses = await this.courseService.CourseModel.count({
            teacher: new ObjectId(req.user._id),
            status: status_enum_1.Status.approved,
        });
        home.latestFeedback = await this.courseService.getReviwsForTeacher(req.user);
        home.rate =
            home.latestFeedback.length > 0
                ? home.latestFeedback.reduce((acc, feedBack) => acc + feedBack.stars, 0) / home.noOfCourses
                : 5;
        let registers = await this.checkoutService.CheckoutModel.countDocuments()
            .populate({
            path: 'lines.course',
            model: course_model_1.Course.name,
        })
            .populate({
            path: 'lines.course.teacher',
            match: new ObjectId(user['_id'].toString()),
        });
        home.noOfStudents = registers;
        let todayCourses = teacherCourses;
        home.todayCourses = todayCourses;
        return home;
    }
};
HomeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [banner_service_1.BannerService,
        partner_service_1.PartnerService,
        user_service_1.UserService,
        subject_service_1.SubjectService,
        course_service_1.CourseService,
        checkout_service_1.CheckoutService])
], HomeService);
exports.HomeService = HomeService;
//# sourceMappingURL=home.service.js.map