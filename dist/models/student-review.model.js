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
exports.StudentReviewSchema = exports.StudentReview = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const base_entity_1 = require("../shared/base-entity");
const swagger_1 = require("@nestjs/swagger");
const course_model_1 = require("./course/course.model");
let StudentReview = class StudentReview extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        autopopulate: true,
    }),
    __metadata("design:type", course_model_1.Course)
], StudentReview.prototype, "course", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], StudentReview.prototype, "valueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'attendance', required: true }),
    (0, mongoose_1.Prop)({ default: true }),
    __metadata("design:type", Boolean)
], StudentReview.prototype, "attendance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'grades', required: true }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], StudentReview.prototype, "grades", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'performance', required: true }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], StudentReview.prototype, "performance", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'understanding', required: true }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], StudentReview.prototype, "understanding", void 0);
StudentReview = __decorate([
    (0, mongoose_1.Schema)()
], StudentReview);
exports.StudentReview = StudentReview;
exports.StudentReviewSchema = mongoose_1.SchemaFactory.createForClass(StudentReview);
//# sourceMappingURL=student-review.model.js.map