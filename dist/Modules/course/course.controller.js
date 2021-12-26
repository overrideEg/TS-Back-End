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
exports.CourseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const course_model_1 = require("../../models/course/course.model");
const course_review_model_1 = require("../../models/course/sub-models/course-review.model");
const jwt_auth_guard_1 = require("../auth/security/jwt-auth.guard");
const course_service_1 = require("./course.service");
let CourseController = class CourseController {
    constructor(service) {
        this.service = service;
    }
    async saveCourse(req, body) {
        return this.service.newCourse(req, body);
    }
    async approveCourse(req, courseId) {
        return this.service.approveCourse(req, courseId);
    }
    async reviewCourse(req, body, courseId) {
        return this.service.reviewCourse(req, courseId, body);
    }
    async applyExcercice(req, body, courseId, lessonId) {
        return this.service.applyExcercice(req, courseId, lessonId, body);
    }
    async getExcercices(req, courseId, lessonId) {
        return this.service.getExcercices(req, courseId, lessonId);
    }
    async getOneCourse(req, id) {
        return this.service.findOne(req, id);
    }
    async update(req, body, id) {
        return this.service.update(req, id, body);
    }
    async teacher(req) {
        return this.service.getTeacherCourses(req);
    }
    async getCoursesInDate(req, timeStamp) {
        return this.service.getCoursesInDate(req, +timeStamp);
    }
    async myCourses(req) {
        return this.service.getStudentCourses(req);
    }
    async delete(req, id) {
        return this.service.delete(req, id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('new'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, course_model_1.Course]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "saveCourse", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('approve/:courseId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "approveCourse", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBody)({ type: course_review_model_1.CourseReview }),
    (0, common_1.Post)('review/:courseId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, course_review_model_1.CourseReview, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "reviewCourse", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('excercice/:courseId/:lessonId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('courseId')),
    __param(3, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array, String, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "applyExcercice", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('excercice/:courseId/:lessonId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('courseId')),
    __param(2, (0, common_1.Param)('lessonId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getExcercices", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getOneCourse", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, course_model_1.Course, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('teacher'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "teacher", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('byDate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('timeStamp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "getCoursesInDate", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('student'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "myCourses", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CourseController.prototype, "delete", null);
CourseController = __decorate([
    (0, swagger_1.ApiTags)('Course'),
    (0, common_1.Controller)('Course'),
    __metadata("design:paramtypes", [course_service_1.CourseService])
], CourseController);
exports.CourseController = CourseController;
//# sourceMappingURL=course.controller.js.map