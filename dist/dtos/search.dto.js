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
exports.GlobalFilter = exports.GlobalSearch = void 0;
const swagger_1 = require("@nestjs/swagger");
const course_model_1 = require("../models/course/course.model");
const teacher_profile_dto_1 = require("./teacher-profile.dto");
class GlobalSearch {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: course_model_1.Course, isArray: true }),
    __metadata("design:type", Array)
], GlobalSearch.prototype, "courses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: teacher_profile_dto_1.TeacherProfile, isArray: true }),
    __metadata("design:type", Array)
], GlobalSearch.prototype, "teachers", void 0);
exports.GlobalSearch = GlobalSearch;
class GlobalFilter {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: course_model_1.Course, isArray: true }),
    __metadata("design:type", Array)
], GlobalFilter.prototype, "featuresCourses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: teacher_profile_dto_1.TeacherProfile, isArray: true }),
    __metadata("design:type", Array)
], GlobalFilter.prototype, "topInstructors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: course_model_1.Course, isArray: true }),
    __metadata("design:type", Array)
], GlobalFilter.prototype, "allCourses", void 0);
exports.GlobalFilter = GlobalFilter;
//# sourceMappingURL=search.dto.js.map