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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const status_enum_1 = require("./../../enums/status.enum");
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const teacher_profile_dto_1 = require("../../dtos/teacher-profile.dto");
const wallet_enum_1 = require("../../enums/wallet.enum");
const bank_account_model_1 = require("../../models/bank-account.model");
const course_model_1 = require("../../models/course/course.model");
const student_review_model_1 = require("../../models/student-review.model");
const user_model_1 = require("../../models/user.model");
const wallet_model_1 = require("../../models/wallet-model");
const lang_enum_1 = require("../../shared/enums/lang.enum");
const checkout_service_1 = require("../checkout/checkout.service");
const course_service_1 = require("../course/course.service");
const ObjectId = require('mongoose').Types.ObjectId;
const moment = require("moment");
const notice_service_1 = require("../notice/notice.service");
const payment_method_enum_1 = require("../../enums/payment-method.enum");
let UserService = UserService_1 = class UserService {
    constructor(UserModel, BankAccountModel, WalletModel, StudentReviewModel, courseService, checkoutService, noticeService) {
        this.UserModel = UserModel;
        this.BankAccountModel = BankAccountModel;
        this.WalletModel = WalletModel;
        this.StudentReviewModel = StudentReviewModel;
        this.courseService = courseService;
        this.checkoutService = checkoutService;
        this.noticeService = noticeService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    async login(username, defaultLang) {
        let user = await this.UserModel.findOne({
            $or: [{ email: username }, { phone: username }],
        }).exec();
        if (user) {
            user.defaultLang = defaultLang !== null && defaultLang !== void 0 ? defaultLang : lang_enum_1.Lang.en;
            user.updateOne(user);
        }
        return user;
    }
    async myProfile(req) {
        return await this.findOne(req.user._id);
    }
    async updateProfile(req, profile) {
        let user = await this.findOne(req.user._id);
        if (profile.name) {
            user.name = profile.name;
        }
        if (profile.avatar) {
            user.avatar = profile.avatar;
        }
        if (profile.email) {
            let existsEmail = await this.UserModel.findOne({ email: profile.email });
            if (existsEmail && req.user.email != profile.email)
                throw new common_1.BadRequestException('this email is used by other user');
            user.email = profile.email;
        }
        if (user.userType === user_model_1.UserType.student) {
            if (profile.gradeId) {
                user.grade['_id'] = profile.gradeId;
            }
            if (profile.stageId) {
                user.stage['_id'] = profile.stageId;
            }
            if (profile.cityId) {
                user.city['_id'] = profile.cityId;
            }
        }
        if (user.userType === user_model_1.UserType.teacher) {
            if (profile.cityId) {
                user.city['_id'] = profile.cityId;
            }
            if (profile.bio) {
                user.bio = profile.bio;
            }
        }
        return await this.update(req.user._id, user);
    }
    async validate(payload) {
        return await this.UserModel.findById(payload._id);
    }
    ifUserExists(email, phone) {
        return this.UserModel.exists({ $or: [{ email: email }, { phone: phone }] });
    }
    async save(req) {
        return await this.UserModel.create(req);
    }
    async findAll(userType) {
        return userType
            ? this.UserModel.find({ userType: userType }).exec()
            : this.UserModel.find().exec();
    }
    async findOne(id) {
        return await this.UserModel.findById(id).exec();
    }
    async update(id, req) {
        await this.UserModel.findByIdAndUpdate(id, req);
        return this.findOne(id);
    }
    async teacherStatus(id) {
        let teacher = await this.findOne(id);
        if (!teacher.teacherApproved) {
            teacher.teacherApproved = true;
            this.noticeService.sendSpecificNotification({
                userId: id,
                notification: {
                    body: `مرحباً ${teacher.name} تم تنشيط حسابك بنجاح`,
                    title: 'تم تنشيط الحساب',
                },
            });
        }
        else {
            teacher.teacherApproved = false;
            this.noticeService.sendSpecificNotification({
                userId: id,
                notification: {
                    body: `مرحباً ${teacher.name} - تم تعطيل حسابك ٫  برجاء التواصل مع الادارة لمعرفة السبب`,
                    title: 'تم تعطيب الحساب',
                },
            });
        }
        return await this.update(id, teacher);
    }
    async remove(id) {
        return await this.UserModel.findByIdAndRemove(id);
    }
    async getTeacherProfile(id) {
        var e_1, _a, e_2, _b;
        var _c;
        let user = await this.findOne(id);
        let courses = await this.courseService.CourseModel.find({
            teacher: new ObjectId(id),
        })
            .sort({ createdAt: 'desc' })
            .exec();
        try {
            for (var courses_1 = __asyncValues(courses), courses_1_1; courses_1_1 = await courses_1.next(), !courses_1_1.done;) {
                const course = courses_1_1.value;
                let progress = 0;
                let videos = 0;
                try {
                    for (var _d = (e_2 = void 0, __asyncValues(course.reviews)), _e; _e = await _d.next(), !_e.done;) {
                        let review = _e.value;
                        review.user = await this.UserModel.findById(review.user).exec();
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_b = _d.return)) await _b.call(_d);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                course['cRating'] =
                    course.reviews.length == 0
                        ? 5
                        : course.reviews.reduce((acc, review) => acc + review.stars, 0) /
                            course.reviews.length;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (courses_1_1 && !courses_1_1.done && (_a = courses_1.return)) await _a.call(courses_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        let profile = new teacher_profile_dto_1.TeacherProfile();
        profile.bio = user.bio;
        profile.courses = courses;
        profile.noOfCourses = courses.length;
        profile.name = user.name;
        profile.userId = user['_id'];
        profile.avatar = (_c = user['avatar']) !== null && _c !== void 0 ? _c : '';
        profile.noOfStudents =
            await this.checkoutService.CheckoutModel.countDocuments({
                paymentStatus: payment_method_enum_1.PaymentStatus.Paid,
            })
                .populate({
                path: 'course',
                model: course_model_1.Course.name,
            })
                .populate({
                path: 'course.teacher._id',
                match: new ObjectId(user['_id']),
            });
        return profile;
    }
    async addBankAccount(req, body) {
        let teacher = await this.findOne(req.user._id);
        let BankAccount = await this.BankAccountModel.create(body);
        teacher.bankAccounts.push(BankAccount);
        await this.UserModel.updateOne({ _id: teacher['_id'] }, teacher);
        return teacher.bankAccounts;
    }
    async getBankAccounts(req) {
        let teacher = await this.findOne(req.user._id);
        if (!teacher)
            throw new common_1.BadRequestException('no user found');
        return teacher.bankAccounts;
    }
    async withDrawCash(req, accountId, amount) {
        var e_3, _a;
        let teacher = await this.findOne(req.user._id);
        if (!teacher)
            throw new common_1.BadRequestException('no user found');
        let account = teacher.bankAccounts.find((acc) => acc['_id'] === accountId);
        let balance = teacher.wallet.reduce((acc, wall) => acc +
            (wall.type === wallet_enum_1.TransactionType.in
                ? wall.value
                : wall.status === status_enum_1.Status.approved
                    ? wall.value
                    : 0), 0);
        if (balance > amount)
            throw new common_1.BadRequestException(`your balance is ${balance} and you requested ${amount}`);
        let wallet = new wallet_model_1.Wallet();
        wallet.account = account;
        wallet.value = amount;
        wallet.date = Date.now();
        wallet.value = amount;
        wallet.type = wallet_enum_1.TransactionType.out;
        wallet = await this.WalletModel.create(wallet);
        teacher.wallet.push(wallet);
        await this.UserModel.updateOne({ _id: teacher['_id'] }, teacher);
        this.noticeService.sendSpecificNotification({
            userId: req.user._id,
            notification: {
                title: teacher.defaultLang === lang_enum_1.Lang.en
                    ? 'request saved successfullty'
                    : 'تم تسجيل طلبك',
                body: teacher.defaultLang === lang_enum_1.Lang.en
                    ? `your request to withdraw cach with amount (${amount}) has been recorded and its status ${wallet.status.toString()}`
                    : `طلبك لسحب مبلغ ${amount} قيد التنفيذ`,
            },
            data: {
                entityType: 'Wallet',
                entityId: wallet['_id'].toString(),
            },
        });
        let admins = await this.UserModel.find({ userType: user_model_1.UserType.admin }).exec();
        try {
            for (var admins_1 = __asyncValues(admins), admins_1_1; admins_1_1 = await admins_1.next(), !admins_1_1.done;) {
                const admin = admins_1_1.value;
                this.noticeService.sendSpecificNotification({
                    userId: admin['_id'].toString(),
                    notification: {
                        title: admin.defaultLang === lang_enum_1.Lang.en
                            ? 'you have new withdraw request'
                            : 'لديك طلب سحب جديد',
                        body: admin.defaultLang === lang_enum_1.Lang.en
                            ? `you have request to withdraw (${amount}) from ${teacher.name} with status ${wallet.status.toString()}`
                            : `لديك طلب سحب مبلغ ${amount} من ${teacher.name} وحالته ${wallet.status.toString()}`,
                    },
                    data: {
                        entityType: 'Wallet',
                        entityId: wallet['_id'].toString(),
                    },
                });
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (admins_1_1 && !admins_1_1.done && (_a = admins_1.return)) await _a.call(admins_1);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return teacher.wallet;
    }
    async approveTransaction(teacherId, walletId) {
        var _a;
        let teacher = await this.UserModel.findById(teacherId).exec();
        let wallet = (_a = teacher === null || teacher === void 0 ? void 0 : teacher.wallet) === null || _a === void 0 ? void 0 : _a.find((wall) => wall['_id'] === walletId);
        if (!teacher || !wallet)
            throw new common_1.BadRequestException('Check sent IDs');
        wallet.status = status_enum_1.Status.approved;
        await this.UserModel.updateOne({ _id: teacher['_id'] }, teacher);
        this.noticeService.sendSpecificNotification({
            userId: teacher['_id'].toString(),
            notification: {
                title: teacher.defaultLang === lang_enum_1.Lang.en
                    ? `your request has been approved`
                    : 'تمت الموافقة على طلبك',
                body: teacher.defaultLang === lang_enum_1.Lang.en
                    ? `your request to withdraw ${wallet.value} has been approved`
                    : `طلبك لسحب ${wallet.value} تمت الموافقة عليه`,
            },
            data: {
                entityType: 'Wallet',
                entityId: wallet['_id'].toString(),
            },
        });
        return wallet;
    }
    async createWalletForCheckout(checkoutSaved) {
        let wallet = new wallet_model_1.Wallet();
        wallet.date = Date.now();
        wallet.type = wallet_enum_1.TransactionType.in;
        wallet.status = status_enum_1.Status.approved;
        wallet.value = checkoutSaved.price;
        wallet.checkout = checkoutSaved;
        wallet = await this.WalletModel.create(wallet);
        checkoutSaved.course.teacher.wallet.push(wallet);
        await this.UserModel.updateOne({ _id: checkoutSaved.course.teacher['_id'] }, checkoutSaved.course.teacher);
    }
    async getWallets(type, status) {
        let teachers = await this.UserModel.find({
            userType: user_model_1.UserType.teacher,
        }).exec();
        let wallets = [];
        teachers.forEach((teacher) => {
            teacher.wallet.forEach((wallet) => {
                if (!type || !status) {
                    wallets.push(wallet);
                }
                if (wallet.type === type && wallet.status === status) {
                    wallets.push(wallet);
                }
            });
        });
        return wallets;
    }
    async reviewStudent(req, studentId, courseId, body) {
        body.course = new ObjectId(courseId);
        body.valueDate = Date.now();
        let student = await this.UserModel.findById(studentId);
        let savedReview = await this.StudentReviewModel.create(body);
        student.studentReviews.push(savedReview);
        await this.UserModel.updateOne({ _id: studentId }, student);
        return student.studentReviews;
    }
    async deleteBankAccount(req, accountId) {
        let teacher = await this.findOne(req.user._id);
        teacher.bankAccounts.splice(teacher.bankAccounts.findIndex((acc) => acc['_id'] === accountId), 1);
        await this.BankAccountModel.deleteOne({ _id: accountId });
        await this.UserModel.updateOne({ _id: teacher['_id'] }, teacher);
        return teacher.bankAccounts;
    }
    async getStudentReviews(req, studentId, subjectId) {
        let student = await this.UserModel.findById(studentId).exec();
        let reviews = student.studentReviews.filter((rev) => { var _a; return ((_a = rev === null || rev === void 0 ? void 0 : rev.course) === null || _a === void 0 ? void 0 : _a.subject['_id'].toString()) === subjectId; });
        let now = moment();
        let lastMonth = now;
        lastMonth.subtract(1, 'month');
        let thisMonthString = moment().format('MM-yyyy');
        let lastMonthString = moment().subtract(1, 'month').format('MM-yyyy');
        let reviewResponse = {};
        reviewResponse[thisMonthString] = {
            attendance: 0,
            grades: 0,
            performance: 0,
            understanding: 0,
        };
        reviewResponse[lastMonthString] = {
            attendance: 0,
            grades: 0,
            performance: 0,
            understanding: 0,
        };
        let thisMonthReviews = reviews.filter((rev) => rev.valueDate >= moment().startOf('month').unix() * 1000 &&
            rev.valueDate <= moment().endOf('month').unix() * 1000);
        if (thisMonthReviews.length > 0)
            reviewResponse[thisMonthString] = {
                attendance: (thisMonthReviews.filter((rev) => rev.attendance === true).length /
                    thisMonthReviews.length) *
                    100,
                grades: thisMonthReviews.reduce((acc, rev) => acc + rev.grades, 0) /
                    thisMonthReviews.length,
                performance: thisMonthReviews.reduce((acc, rev) => acc + rev.performance, 0) /
                    thisMonthReviews.length,
                understanding: thisMonthReviews.reduce((acc, rev) => acc + rev.understanding, 0) /
                    thisMonthReviews.length,
            };
        let lastMonthReviews = reviews.filter((rev) => rev.valueDate >=
            moment().subtract(1, 'month').startOf('month').unix() * 1000 &&
            rev.valueDate <=
                moment().subtract(1, 'month').endOf('month').unix() * 1000);
        if (lastMonthReviews.length > 0)
            reviewResponse[lastMonthString] = {
                attendance: (lastMonthReviews.filter((rev) => rev.attendance === true).length /
                    lastMonthReviews.length) *
                    100,
                grades: lastMonthReviews.reduce((acc, rev) => acc + rev.grades, 0) /
                    lastMonthReviews.length,
                performance: lastMonthReviews.reduce((acc, rev) => acc + rev.performance, 0) /
                    lastMonthReviews.length,
                understanding: lastMonthReviews.reduce((acc, rev) => acc + rev.understanding, 0) /
                    lastMonthReviews.length,
            };
        return reviewResponse;
    }
};
UserService = UserService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(bank_account_model_1.BankAccount.name)),
    __param(2, (0, mongoose_1.InjectModel)(wallet_model_1.Wallet.name)),
    __param(3, (0, mongoose_1.InjectModel)(student_review_model_1.StudentReview.name)),
    __param(4, (0, common_1.Inject)((0, common_1.forwardRef)(() => course_service_1.CourseService))),
    __param(5, (0, common_1.Inject)((0, common_1.forwardRef)(() => checkout_service_1.CheckoutService))),
    __param(6, (0, common_1.Inject)((0, common_1.forwardRef)(() => notice_service_1.NoticeService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        course_service_1.CourseService,
        checkout_service_1.CheckoutService,
        notice_service_1.NoticeService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map