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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payment_method_enum_1 = require("../../enums/payment-method.enum");
const status_enum_1 = require("../../enums/status.enum");
const course_model_1 = require("../../models/course/course.model");
const course_review_model_1 = require("../../models/course/sub-models/course-review.model");
const user_model_1 = require("../../models/user.model");
const lang_enum_1 = require("../../shared/enums/lang.enum");
const override_utils_1 = require("../../shared/override-utils");
const checkout_service_1 = require("../checkout/checkout.service");
const user_service_1 = require("../user/user.service");
const ObjectId = require('mongoose').Types.ObjectId;
let CourseService = class CourseService {
    constructor(CourseModel, reviewModel, userService, checkoutService) {
        this.CourseModel = CourseModel;
        this.reviewModel = reviewModel;
        this.userService = userService;
        this.checkoutService = checkoutService;
    }
    async newCourse(req, body) {
        if (req.user.userType !== user_model_1.UserType.teacher) {
            throw new common_1.BadRequestException('only teacher can add courses');
        }
        body.teacher = req.user;
        return this.CourseModel.create(body);
    }
    async approveCourse(req, courseId) {
        if (req.user.userType !== user_model_1.UserType.admin) {
            throw new common_1.BadRequestException('only admin can approve  courses');
        }
        let course = await this.CourseModel.findByIdAndUpdate(courseId, {
            $set: { status: status_enum_1.Status.approved },
        });
        course.status = status_enum_1.Status.approved;
        return course;
    }
    async update(req, id, body) {
        if (req.user.userType !== user_model_1.UserType.teacher) {
            throw new common_1.BadRequestException('only teacher can update courses');
        }
        let teacher = await this.userService.findOne(req.user._id);
        if (teacher['_id'].toString() !== req.user._id) {
            throw new common_1.BadRequestException('only teacher can update his courses');
        }
        await this.CourseModel.updateOne({ _id: id }, body).exec();
        return await this.findOne(req, id);
    }
    async delete(req, id) {
        if (req.user.userType !== user_model_1.UserType.teacher.toString()) {
            throw new common_1.BadRequestException('only teacher can update courses');
        }
        let teacher = await this.userService.findOne(req.user._id);
        if (teacher['_id'].toString() !== req.user._id) {
            throw new common_1.BadRequestException('only teacher can update his courses');
        }
        let course = await this.CourseModel.findById(id).exec();
        if (course.startDate < Date.now()) {
            throw new common_1.BadRequestException('you can not delete started course');
        }
        let orders = await this.checkoutService.CheckoutModel.exists({
            course: new ObjectId(id),
            paymentStatus: payment_method_enum_1.PaymentStatus.Paid,
        });
        if (orders) {
            throw new common_1.BadRequestException(req.user.defaultLang === lang_enum_1.Lang.en
                ? 'you can not delete course because you have reservations'
                : 'لا يمكن حذف الدورة لوجود حجوزات بها');
        }
        return await this.CourseModel.findByIdAndDelete(id);
    }
    async reviewCourse(req, courseId, body) {
        body.user = new ObjectId(req.user._id);
        let review = await this.reviewModel.create(body);
        let course = await this.CourseModel.findByIdAndUpdate(courseId, {
            $push: { reviews: review },
        }).exec();
        course.reviews.push(review);
        return course.reviews;
    }
    async findOne(req, id) {
        let courses = await this.CourseModel.aggregate([
            {
                $match: {
                    _id: new ObjectId(id),
                },
            },
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
                    from: 'excercices',
                    localField: 'excercices',
                    foreignField: '_id',
                    as: 'excercices',
                },
            },
            {
                $lookup: {
                    from: 'fs.files',
                    localField: 'attachements',
                    foreignField: '_id',
                    as: 'attachements',
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
            { $unset: ['grade.stage'] },
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
                $lookup: {
                    from: 'courses',
                    let: { relatedId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $not: { $eq: ['$$relatedId', '$_id'] } },
                                        { status: status_enum_1.Status.approved },
                                        {
                                            $or: [
                                                { subject: '$subject' },
                                                { teacher: '$teacher' },
                                                { grade: '$grade' },
                                            ],
                                        },
                                    ],
                                },
                            },
                        },
                        {
                            $unset: [
                                'attachements',
                                'days',
                                'hour',
                                'excercices',
                                'reviews',
                                'startDate',
                                'grade',
                                'subject',
                                'teacher',
                            ],
                        },
                    ],
                    as: 'related',
                },
            },
            {
                $unset: [
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
        let course = courses.length > 0 ? courses[0] : null;
        if (!course) {
            throw new common_1.BadRequestException('Course Not Found');
        }
        course.enrolled = await this.checkoutService.CheckoutModel.count({
            course: new ObjectId(id),
            paymentStatus: payment_method_enum_1.PaymentStatus.Paid,
        });
        let reviews = await this.getReviwsForTeacher(course.teacher);
        course.teacher.noOfCourses = await this.CourseModel.count({
            teacher: course.teacher,
        });
        course.teacher.reviewsCount = reviews.length;
        course.teacher.rate =
            reviews.length > 0
                ? reviews.reduce((acc, feedBack) => acc + feedBack.stars, 0) /
                    course.teacher.noOfCourses
                : 5;
        return course;
    }
    async getTeacherCourses(req) {
        if (req.user.userType !== user_model_1.UserType.teacher.toString()) {
            throw new common_1.BadRequestException('only teacher can view this request');
        }
        let teacher = await this.userService.findOne(req.user._id);
        delete teacher.wallet;
        let courses = [];
        return courses;
    }
    async getCoursesInDate(req, timeStamp) {
        if (req.user.userType !== user_model_1.UserType.teacher.toString()) {
            throw new common_1.BadRequestException('only teacher can view this request');
        }
        let teacher = await this.userService.findOne(req.user._id);
        let courses = [];
        if (teacher) {
            courses = await this.CourseModel.find({ teacher: teacher['_id'] }).exec();
        }
        let dayOfWeek = new Date(timeStamp).getDay();
        courses = courses.filter((course) => {
            let today = course.Days.find((day) => override_utils_1.OverrideUtils.dayOffDay(day) === dayOfWeek);
            let notFinished = course.content.find((content) => content.lessons.find((lesson) => lesson.isDone == false ||
                lesson.isDone == null ||
                lesson.isDone == undefined));
            return today && notFinished;
        });
        return courses;
    }
    async getStudentCourses(req) {
        var e_1, _a;
        let purchased = [];
        if (req.user.userType === user_model_1.UserType.parent) {
            let parent = await this.userService.findOne(req.user._id);
            try {
                for (var _b = __asyncValues(parent.students), _c; _c = await _b.next(), !_c.done;) {
                    const student = _c.value;
                    purchased.push(await this.checkoutService.CheckoutModel.find({
                        user: student,
                        paymentStatus: payment_method_enum_1.PaymentStatus.Paid,
                    })
                        .sort({ valueDate: 'desc' })
                        .exec());
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) await _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        purchased = await this.checkoutService.CheckoutModel.find({
            user: new ObjectId(req.user._id),
            paymentStatus: payment_method_enum_1.PaymentStatus.Paid,
        })
            .sort({ valueDate: 'desc' })
            .exec();
        return purchased.map((checkout) => checkout.course);
    }
    async applyExcercice(req, courseId, lessonId, body) {
        let checkout = await this.checkoutService.CheckoutModel.findOne({
            course: new ObjectId(courseId),
            user: new ObjectId(req.user._id),
            paymentStatus: payment_method_enum_1.PaymentStatus.Paid,
        });
        if (!checkout)
            throw new common_1.BadRequestException('you dont purchased this course');
        let course = checkout.course;
        delete course.teacher.wallet;
        return null;
    }
    async getExcercices(req, courseId, lessonId) {
        let course = await this.CourseModel.findById(courseId);
        return [];
    }
    async getReviwsForTeacher(teacher) {
        return await this.CourseModel.aggregate([
            {
                $match: {
                    $and: [
                        { teacher: new ObjectId(teacher._id) },
                        { status: status_enum_1.Status.approved },
                    ],
                },
            },
            {
                $lookup: {
                    from: 'coursereviews',
                    localField: 'reviews',
                    foreignField: '_id',
                    as: 'reviews',
                },
            },
            { $unwind: '$reviews' },
            {
                $replaceRoot: {
                    newRoot: '$reviews',
                },
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user',
                },
            },
            {
                $unset: [
                    'user.students',
                    'user.bankAccounts',
                    'user.wallet',
                    'user.studentReviews',
                    'user.studentId',
                    'user.cart',
                    'user.userType',
                    'user.tempCode',
                    'user.defaultLang',
                    'user.teacherApproved',
                    'user.isActive',
                    'user.password',
                    'user.city',
                    'user.additionalPhone',
                    'user.coverletter',
                    'user.resume',
                    'user.email',
                    'user.phone',
                ],
            },
        ]);
    }
};
CourseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(course_model_1.Course.name)),
    __param(1, (0, mongoose_1.InjectModel)(course_review_model_1.CourseReview.name)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => checkout_service_1.CheckoutService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        user_service_1.UserService,
        checkout_service_1.CheckoutService])
], CourseService);
exports.CourseService = CourseService;
//# sourceMappingURL=course.service.js.map