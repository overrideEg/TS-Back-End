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
var CheckoutService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const payment_method_enum_1 = require("../../enums/payment-method.enum");
const checkout_model_1 = require("../../models/checkout.model");
const lang_enum_1 = require("../../shared/enums/lang.enum");
const constants_1 = require("../auth/security/constants");
const course_service_1 = require("../course/course.service");
const notice_service_1 = require("../notice/notice.service");
const promotion_service_1 = require("../promotion/promotion.service");
const user_service_1 = require("../user/user.service");
const axios_1 = require("@nestjs/axios");
const pricing_service_1 = require("../pricing/pricing.service");
const course_type_enum_1 = require("../../enums/course-type.enum");
const ObjectId = require('mongoose').Types.ObjectId;
let CheckoutService = CheckoutService_1 = class CheckoutService {
    constructor(CheckoutModel, courseService, userService, promotionService, noticeService, httpService, pricingService) {
        this.CheckoutModel = CheckoutModel;
        this.courseService = courseService;
        this.userService = userService;
        this.promotionService = promotionService;
        this.noticeService = noticeService;
        this.httpService = httpService;
        this.pricingService = pricingService;
        this.log = new common_1.Logger(CheckoutService_1.name);
    }
    async save(req) {
        let saved = await this.CheckoutModel.create(req);
        return saved;
    }
    async checkAndPay(req, body) {
        var e_1, _a, e_2, _b;
        var _c, _d;
        let pricing = await this.pricingService.getCurrentPricings();
        let promotion;
        if (body.promoCode && body.promoCode !== null && body.promoCode !== '') {
            promotion = await this.promotionService.PromotionModel.findOne({
                code: body.promoCode,
            }).exec();
            if (!promotion)
                throw new common_1.BadRequestException(((_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.defaultLang) === lang_enum_1.Lang.en
                    ? `${body.promoCode} Not found`
                    : `لم يتم العثور على كود ${body.promoCode}`);
            if (promotion.useOnce) {
                let existsCheckout = await this.CheckoutModel.exists({
                    promoCode: body.promoCode,
                });
                if (existsCheckout) {
                    throw new common_1.BadRequestException(((_d = req === null || req === void 0 ? void 0 : req.user) === null || _d === void 0 ? void 0 : _d.defaultLang) === lang_enum_1.Lang.en
                        ? `${body.promoCode} used before`
                        : `مستخدم من قبل ${body.promoCode}`);
                }
            }
        }
        let checkouts = [];
        try {
            for (var _e = __asyncValues(body.courses), _f; _f = await _e.next(), !_f.done;) {
                let course = _f.value;
                let checkout = new checkout_model_1.Checkout();
                if (body.purchasedFor) {
                    checkout.user = await this.userService.UserModel.findOne({
                        studentId: body.purchasedFor,
                    }).exec();
                    if (!checkout.user)
                        throw new common_1.BadRequestException(req.user.defaultLang === lang_enum_1.Lang.en
                            ? 'please enter correct student id'
                            : 'لا يوجد طالب بالكود الموجود');
                }
                else {
                    checkout.user = new ObjectId(req.user._id);
                }
                course = await this.courseService.CourseModel.findById(course._id);
                checkout.course = course;
                checkout.price = this.calculatePrice(course, pricing, body.paymentMethod);
                checkout.valueDate = Date.now();
                checkout.priceBeforeDiscount = checkout.price;
                if (promotion) {
                    checkout.discount =
                        (checkout.priceBeforeDiscount * promotion.discountPercent) / 100;
                    checkout.priceAfterDiscount =
                        checkout.priceBeforeDiscount - checkout.discount;
                }
                else {
                    checkout.priceAfterDiscount = checkout.priceBeforeDiscount;
                }
                let checkoutSaved = await this.CheckoutModel.create(checkout);
                checkouts.push(checkoutSaved);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e.return)) await _a.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        let user = await this.userService.findOne(req.user._id);
        user.cart = [];
        await this.userService.update(req.user._id, user);
        try {
            for (var checkouts_1 = __asyncValues(checkouts), checkouts_1_1; checkouts_1_1 = await checkouts_1.next(), !checkouts_1_1.done;) {
                const checkout = checkouts_1_1.value;
                await this.CheckoutModel.findByIdAndUpdate(checkout._id);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (checkouts_1_1 && !checkouts_1_1.done && (_b = checkouts_1.return)) await _b.call(checkouts_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return checkouts;
    }
    calculatePrice(course, pricing, paymentMethod) {
        var _a, _b, _c, _d, _e, _f, _g;
        switch (course.type) {
            case course_type_enum_1.CourseType.home:
                return (_a = course.price) !== null && _a !== void 0 ? _a : 0;
            case course_type_enum_1.CourseType.session:
                return paymentMethod === payment_method_enum_1.PaymentMethod.APPLE
                    ? (_b = pricing.sessionApplePrice) !== null && _b !== void 0 ? _b : 0
                    : payment_method_enum_1.PaymentMethod.ANDROID
                        ? (_c = pricing.sessionAndroidPrice) !== null && _c !== void 0 ? _c : 0
                        : (_d = pricing.sessionWebPrice) !== null && _d !== void 0 ? _d : 0;
            case course_type_enum_1.CourseType.tutorial:
                return paymentMethod === payment_method_enum_1.PaymentMethod.APPLE
                    ? (_e = pricing.tutorialApplePrice) !== null && _e !== void 0 ? _e : 0
                    : payment_method_enum_1.PaymentMethod.ANDROID
                        ? (_f = pricing.tutorialAndroidPrice) !== null && _f !== void 0 ? _f : 0
                        : (_g = pricing.tutorialWebPrice) !== null && _g !== void 0 ? _g : 0;
            default:
                return 0;
        }
    }
    async authorize(paymentMethod, id, path) {
        var e_3, _a;
        var _b, _c, _d;
        let checkouts = await this.CheckoutModel.find({ paymentId: id });
        let paymentResult;
        path += `?entityId=${paymentMethod !== payment_method_enum_1.PaymentMethod.MADA
            ? constants_1.Payment.entityIdVisaMaster
            : constants_1.Payment.entityIdMada}`;
        if (checkouts.reduce((acc, check) => acc + check.priceAfterDiscount, 0) > 0) {
            await this.httpService
                .get(path, {
                baseURL: constants_1.Payment.baseURL,
                method: 'GET',
                headers: {
                    Authorization: constants_1.Payment.token,
                },
            })
                .toPromise()
                .then((res) => {
                paymentResult = res.data;
                console.log(res.data.result);
            })
                .catch(async (err) => {
                paymentResult = err.response.data;
            });
        }
        try {
            for (var checkouts_2 = __asyncValues(checkouts), checkouts_2_1; checkouts_2_1 = await checkouts_2.next(), !checkouts_2_1.done;) {
                const checkout = checkouts_2_1.value;
                if (checkouts.reduce((acc, check) => acc + check.priceAfterDiscount, 0) == 0) {
                    checkout.paymentResult = {
                        result: {
                            code: '000.100.110',
                        },
                    };
                }
                checkout.paymentResult = paymentResult;
                checkout.paymentStatus =
                    checkouts.reduce((acc, check) => acc + check.priceAfterDiscount, 0) == 0
                        ? payment_method_enum_1.PaymentStatus.Paid
                        : ((_b = paymentResult.result) === null || _b === void 0 ? void 0 : _b.code) === '000.100.110'
                            ? payment_method_enum_1.PaymentStatus.Paid
                            : payment_method_enum_1.PaymentStatus.Fail;
                console.log('checkout', checkout.paymentStatus);
                await this.CheckoutModel.findByIdAndUpdate(checkout['_id'], checkout);
                try {
                    let course = checkout['course'];
                    await this.courseService.CourseModel.updateOne({ _id: checkout.course['_id'] }, course);
                    this.noticeService.sendSpecificNotification({
                        userId: checkout.user['_id'].toString(),
                        notification: {
                            title: checkout.user.defaultLang === lang_enum_1.Lang.en
                                ? `Successfull Subscription`
                                : `تم الاشتراك بنجاح`,
                            body: checkout.user.defaultLang === lang_enum_1.Lang.en
                                ? `your subscription is successfull to coursse ${course.name} with teacher ${(_c = course.teacher) === null || _c === void 0 ? void 0 : _c.name} with amount ${checkout.priceAfterDiscount}`
                                : `تم الاشتراك بنجاح في دورة ${course.name} مع المدرس ${(_d = course.teacher) === null || _d === void 0 ? void 0 : _d.name} بمبلغ ${checkout.priceAfterDiscount}`,
                        },
                        data: {
                            entityType: 'Course',
                            entityId: course['_id'].toString(),
                        },
                    });
                    this.noticeService.sendSpecificNotification({
                        userId: course.teacher['_id'].toString(),
                        notification: {
                            title: course.teacher.defaultLang === lang_enum_1.Lang.en
                                ? `new Subscription`
                                : `لديــك اشتــراك جديــد`,
                            body: course.teacher.defaultLang === lang_enum_1.Lang.en
                                ? `you have a new subscription ${course.name} with amount ${checkout.priceAfterDiscount}`
                                : `لديك اشتراك جديد في دورة ${course.name} بمبلغ ${checkout.priceAfterDiscount}`,
                        },
                        data: {
                            entityType: 'Course',
                            entityId: course['_id'].toString(),
                        },
                    });
                    this.userService.createWalletForCheckout(checkout);
                }
                catch (e) { }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (checkouts_2_1 && !checkouts_2_1.done && (_a = checkouts_2.return)) await _a.call(checkouts_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return paymentResult.result;
    }
};
CheckoutService = CheckoutService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(checkout_model_1.Checkout.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => course_service_1.CourseService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(() => promotion_service_1.PromotionService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        course_service_1.CourseService,
        user_service_1.UserService,
        promotion_service_1.PromotionService,
        notice_service_1.NoticeService,
        axios_1.HttpService,
        pricing_service_1.PricingService])
], CheckoutService);
exports.CheckoutService = CheckoutService;
//# sourceMappingURL=checkout.service.js.map