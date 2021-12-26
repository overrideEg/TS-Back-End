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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherHome = exports.StudentHome = void 0;
const swagger_1 = require("@nestjs/swagger");
const banner_model_1 = require("../models/banner.model");
const course_model_1 = require("../models/course/course.model");
const course_review_model_1 = require("../models/course/sub-models/course-review.model");
const partner_model_1 = require("../models/partner.model");
const subject_model_1 = require("../models/subject.model");
const teacher_profile_dto_1 = require("./teacher-profile.dto");
class StudentHome {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: banner_model_1.Banner, isArray: true }),
    __metadata("design:type", Array)
], StudentHome.prototype, "banners", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: course_model_1.Course, isArray: true }),
    __metadata("design:type", Array)
], StudentHome.prototype, "featuresCourses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: course_model_1.Course, isArray: true }),
    __metadata("design:type", Array)
], StudentHome.prototype, "startSoon", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: subject_model_1.Subject, isArray: true }),
    __metadata("design:type", Array)
], StudentHome.prototype, "subjects", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: teacher_profile_dto_1.TeacherProfile, isArray: true }),
    __metadata("design:type", Array)
], StudentHome.prototype, "topInstructors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: partner_model_1.Partner, isArray: true }),
    __metadata("design:type", Array)
], StudentHome.prototype, "partners", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: course_model_1.Course, isArray: true }),
    __metadata("design:type", Array)
], StudentHome.prototype, "addedRecently", void 0);
exports.StudentHome = StudentHome;
class TeacherHome {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: course_model_1.Course, isArray: true }),
    __metadata("design:type", Array)
], TeacherHome.prototype, "todayCourses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TeacherHome.prototype, "noOfCourses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TeacherHome.prototype, "noOfStudents", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TeacherHome.prototype, "rate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: course_review_model_1.CourseReview, isArray: true }),
    __metadata("design:type", Array)
], TeacherHome.prototype, "latestFeedback", void 0);
exports.TeacherHome = TeacherHome;
//# sourceMappingURL=home.dto.js.map