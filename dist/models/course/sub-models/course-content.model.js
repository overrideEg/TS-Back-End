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
exports.CourseContentSchema = exports.CourseContent = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const base_entity_1 = require("../../../shared/base-entity");
const lesson_model_1 = require("./lesson.model");
const swagger_1 = require("@nestjs/swagger");
let CourseContent = class CourseContent extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], CourseContent.prototype, "chapter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => lesson_model_1.Lesson, description: 'Lessons', isArray: true }),
    (0, mongoose_1.Prop)([
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: lesson_model_1.Lesson.name,
            autopopulate: true,
        },
    ]),
    __metadata("design:type", Array)
], CourseContent.prototype, "lessons", void 0);
CourseContent = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        skipVersioning: true,
    })
], CourseContent);
exports.CourseContent = CourseContent;
exports.CourseContentSchema = mongoose_1.SchemaFactory.createForClass(CourseContent);
//# sourceMappingURL=course-content.model.js.map