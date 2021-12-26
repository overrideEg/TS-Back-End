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
exports.CourseReviewSchema = exports.CourseReview = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const base_entity_1 = require("../../../shared/base-entity");
const swagger_1 = require("@nestjs/swagger");
const user_model_1 = require("../../user.model");
let CourseReview = class CourseReview extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_model_1.User, description: 'comment', required: true }),
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_model_1.User)
], CourseReview.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'comment', required: true }),
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], CourseReview.prototype, "comment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'stars', required: true }),
    (0, mongoose_1.Prop)({ default: 5 }),
    __metadata("design:type", Number)
], CourseReview.prototype, "stars", void 0);
CourseReview = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        skipVersioning: true,
    })
], CourseReview);
exports.CourseReview = CourseReview;
exports.CourseReviewSchema = mongoose_1.SchemaFactory.createForClass(CourseReview);
//# sourceMappingURL=course-review.model.js.map