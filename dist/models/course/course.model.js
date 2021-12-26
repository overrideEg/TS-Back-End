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
exports.CourseSchema = exports.Course = exports.random = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const swagger_1 = require("@nestjs/swagger");
const grade_model_1 = require("../grade.model");
const day_enum_1 = require("../../shared/enums/day.enum");
const subject_model_1 = require("../subject.model");
const class_validator_1 = require("class-validator");
const user_model_1 = require("../user.model");
const localized_1 = require("../../shared/localized");
const course_review_model_1 = require("./sub-models/course-review.model");
const course_type_enum_1 = require("../../enums/course-type.enum");
const file_entity_1 = require("../../Modules/file/entities/file.entity");
const status_enum_1 = require("../../enums/status.enum");
const excercice_model_1 = require("./sub-models/excercice.model");
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;
exports.random = random;
let Course = class Course {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", Object)
], Course.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'createdAt', required: true }),
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", Number)
], Course.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'updatedAt', required: true }),
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], Course.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: [status_enum_1.Status.pending, status_enum_1.Status.approved],
        default: status_enum_1.Status.pending,
    }),
    (0, mongoose_1.Prop)({ enum: [status_enum_1.Status.pending, status_enum_1.Status.approved], default: status_enum_1.Status.pending }),
    __metadata("design:type", String)
], Course.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'CourseType',
        enum: [course_type_enum_1.CourseType.session, course_type_enum_1.CourseType.tutorial, course_type_enum_1.CourseType.home],
        default: course_type_enum_1.CourseType.session,
    }),
    (0, mongoose_1.Prop)({
        enum: [course_type_enum_1.CourseType.session, course_type_enum_1.CourseType.tutorial, course_type_enum_1.CourseType.home],
        default: course_type_enum_1.CourseType.session,
    }),
    __metadata("design:type", String)
], Course.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => localized_1.Localized }),
    (0, mongoose_1.Prop)({ type: () => localized_1.Localized }),
    __metadata("design:type", localized_1.Localized)
], Course.prototype, "cover", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => localized_1.Localized }),
    (0, mongoose_1.Prop)({ type: () => localized_1.Localized }),
    __metadata("design:type", localized_1.Localized)
], Course.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => localized_1.Localized }),
    (0, mongoose_1.Prop)({ type: () => localized_1.Localized }),
    __metadata("design:type", localized_1.Localized)
], Course.prototype, "info", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Course.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => localized_1.Localized }),
    (0, mongoose_1.Prop)({ type: () => localized_1.Localized }),
    __metadata("design:type", localized_1.Localized)
], Course.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => grade_model_1.Grade }),
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: grade_model_1.Grade.name,
        autopopulate: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", grade_model_1.Grade)
], Course.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => subject_model_1.Subject }),
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: subject_model_1.Subject.name,
        autopopulate: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", subject_model_1.Subject)
], Course.prototype, "subject", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Course.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => course_review_model_1.CourseReview,
        description: 'CourseReviews',
        isArray: true,
    }),
    (0, mongoose_1.Prop)([
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: course_review_model_1.CourseReview.name,
            autopopulate: true,
        },
    ]),
    __metadata("design:type", Array)
], Course.prototype, "reviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_model_1.User }),
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true,
    }),
    __metadata("design:type", user_model_1.User)
], Course.prototype, "teacher", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: [
            day_enum_1.Day.Friday,
            day_enum_1.Day.Saturday,
            day_enum_1.Day.Sunday,
            day_enum_1.Day.Monday,
            day_enum_1.Day.Tuesday,
            day_enum_1.Day.Wednesday,
            day_enum_1.Day.Thursday,
        ],
        isArray: true,
    }),
    (0, mongoose_1.Prop)({
        enum: [
            day_enum_1.Day.Friday,
            day_enum_1.Day.Saturday,
            day_enum_1.Day.Sunday,
            day_enum_1.Day.Monday,
            day_enum_1.Day.Tuesday,
            day_enum_1.Day.Wednesday,
            day_enum_1.Day.Thursday,
        ],
        type: [String],
    }),
    (0, class_validator_1.IsEnum)(day_enum_1.Day, { each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], Course.prototype, "days", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Course.prototype, "hour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => file_entity_1.OFile, description: 'OFiles', isArray: true }),
    (0, mongoose_1.Prop)([
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'fs.files',
            autopopulate: true,
        },
    ]),
    __metadata("design:type", Array)
], Course.prototype, "attachements", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => excercice_model_1.Excercice,
        description: 'Excercices',
        isArray: true,
    }),
    (0, mongoose_1.Prop)([{ type: mongoose.Schema.Types.ObjectId, ref: excercice_model_1.Excercice.name }]),
    __metadata("design:type", Array)
], Course.prototype, "excercices", void 0);
Course = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        skipVersioning: true,
    })
], Course);
exports.Course = Course;
exports.CourseSchema = mongoose_1.SchemaFactory.createForClass(Course);
exports.CourseSchema.index({
    '$**': 'text',
});
//# sourceMappingURL=course.model.js.map