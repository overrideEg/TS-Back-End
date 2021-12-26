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
exports.LessonSchema = exports.Lesson = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const base_entity_1 = require("../../../shared/base-entity");
const swagger_1 = require("@nestjs/swagger");
const lesson_type_enum_1 = require("../../../enums/lesson-type.enum");
const excercice_model_1 = require("./excercice.model");
const file_entity_1 = require("../../../Modules/file/entities/file.entity");
let Lesson = class Lesson extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Lesson.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [lesson_type_enum_1.LessonType.excercice, lesson_type_enum_1.LessonType.video] }),
    (0, mongoose_1.Prop)({ enum: [lesson_type_enum_1.LessonType.video, lesson_type_enum_1.LessonType.excercice] }),
    __metadata("design:type", String)
], Lesson.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'OFile', nullable: true, type: () => file_entity_1.OFile }),
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: file_entity_1.OFile.name,
        autopopulate: true,
    }),
    __metadata("design:type", file_entity_1.OFile)
], Lesson.prototype, "attachement", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => excercice_model_1.Excercice,
        description: 'Excercices',
        isArray: true,
    }),
    (0, mongoose_1.Prop)([{ type: mongoose.Schema.Types.ObjectId, ref: excercice_model_1.Excercice.name }]),
    __metadata("design:type", Array)
], Lesson.prototype, "excercices", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], Lesson.prototype, "isDone", void 0);
Lesson = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        skipVersioning: true,
    })
], Lesson);
exports.Lesson = Lesson;
exports.LessonSchema = mongoose_1.SchemaFactory.createForClass(Lesson);
//# sourceMappingURL=lesson.model.js.map