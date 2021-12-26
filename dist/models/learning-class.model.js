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
exports.LearningClassSchema = exports.LearningClass = exports.ChatMessage = exports.AttendanceLog = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const base_entity_1 = require("../shared/base-entity");
const course_model_1 = require("./course/course.model");
const user_model_1 = require("./user.model");
const lesson_model_1 = require("./course/sub-models/lesson.model");
class AttendanceLog {
}
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: user_model_1.User.name,
        autopopulate: true,
    }),
    __metadata("design:type", user_model_1.User)
], AttendanceLog.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", Number)
], AttendanceLog.prototype, "time", void 0);
exports.AttendanceLog = AttendanceLog;
class ChatMessage {
}
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: user_model_1.User.name,
        autopopulate: true,
    }),
    __metadata("design:type", user_model_1.User)
], ChatMessage.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", Number)
], ChatMessage.prototype, "time", void 0);
__decorate([
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], ChatMessage.prototype, "message", void 0);
exports.ChatMessage = ChatMessage;
let LearningClass = class LearningClass extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: course_model_1.Course.name,
        autopopulate: true,
    }),
    __metadata("design:type", course_model_1.Course)
], LearningClass.prototype, "course", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: () => lesson_model_1.Lesson }),
    __metadata("design:type", lesson_model_1.Lesson)
], LearningClass.prototype, "lesson", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], LearningClass.prototype, "startTime", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], LearningClass.prototype, "endTime", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], LearningClass.prototype, "attenders", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LearningClass.prototype, "teacherToken", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], LearningClass.prototype, "studentToken", void 0);
__decorate([
    (0, mongoose_1.Prop)([AttendanceLog]),
    __metadata("design:type", Array)
], LearningClass.prototype, "attendanceLogs", void 0);
__decorate([
    (0, mongoose_1.Prop)([ChatMessage]),
    __metadata("design:type", Array)
], LearningClass.prototype, "chat", void 0);
LearningClass = __decorate([
    (0, mongoose_1.Schema)()
], LearningClass);
exports.LearningClass = LearningClass;
exports.LearningClassSchema = mongoose_1.SchemaFactory.createForClass(LearningClass);
//# sourceMappingURL=learning-class.model.js.map