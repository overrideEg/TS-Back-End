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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningClassService = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth/auth.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const learning_class_model_1 = require("../../models/learning-class.model");
const course_service_1 = require("../course/course.service");
const checkout_service_1 = require("../checkout/checkout.service");
const notice_service_1 = require("../notice/notice.service");
const ObjectId = require('mongoose').Types.ObjectId;
let LearningClassService = class LearningClassService {
    constructor(model, authenticationService, checkoutService, courseService, noticeService) {
        this.model = model;
        this.authenticationService = authenticationService;
        this.checkoutService = checkoutService;
        this.courseService = courseService;
        this.noticeService = noticeService;
    }
};
LearningClassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(learning_class_model_1.LearningClass.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_service_1.AuthService,
        checkout_service_1.CheckoutService,
        course_service_1.CourseService,
        notice_service_1.NoticeService])
], LearningClassService);
exports.LearningClassService = LearningClassService;
//# sourceMappingURL=learning-class.service.js.map