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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = exports.User = exports.UserType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const base_entity_1 = require("../shared/base-entity");
const lang_enum_1 = require("../shared/enums/lang.enum");
const swagger_1 = require("@nestjs/swagger");
const city_model_1 = require("./city.model");
const grade_model_1 = require("./grade.model");
const stage_model_1 = require("./stage.model");
const student_review_model_1 = require("./student-review.model");
const bank_account_model_1 = require("./bank-account.model");
const wallet_model_1 = require("./wallet-model");
var UserType;
(function (UserType) {
    UserType["admin"] = "Admin";
    UserType["student"] = "Student";
    UserType["teacher"] = "Teacher";
    UserType["parent"] = "Parent";
})(UserType = exports.UserType || (exports.UserType = {}));
let User = User_1 = class User extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "teacherApproved", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({ enum: [lang_enum_1.Lang.en, lang_enum_1.Lang.ar], default: lang_enum_1.Lang.en }),
    __metadata("design:type", String)
], User.prototype, "defaultLang", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: '12345' }),
    __metadata("design:type", String)
], User.prototype, "tempCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        enum: [UserType.admin, UserType.parent, UserType.student, UserType.teacher],
        default: UserType.student,
    }),
    __metadata("design:type", String)
], User.prototype, "userType", void 0);
__decorate([
    (0, mongoose_1.Prop)([
        { type: mongoose.Schema.Types.ObjectId, ref: 'Course', autopopulate: true },
    ]),
    __metadata("design:type", Array)
], User.prototype, "cart", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => city_model_1.City }),
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: city_model_1.City.name,
        autopopulate: true,
    }),
    __metadata("design:type", city_model_1.City)
], User.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)({ default: (Math.random() * 100000).toFixed(0) }),
    __metadata("design:type", String)
], User.prototype, "studentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => stage_model_1.Stage }),
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: stage_model_1.Stage.name,
        autopopulate: true,
    }),
    __metadata("design:type", stage_model_1.Stage)
], User.prototype, "stage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => grade_model_1.Grade }),
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: grade_model_1.Grade.name,
        autopopulate: true,
    }),
    __metadata("design:type", grade_model_1.Grade)
], User.prototype, "grade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => student_review_model_1.StudentReview, isArray: true }),
    (0, mongoose_1.Prop)([
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: student_review_model_1.StudentReview.name,
            autopopulate: true,
        },
    ]),
    __metadata("design:type", Array)
], User.prototype, "studentReviews", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "additionalPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "resume", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "coverletter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], User.prototype, "cRating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => wallet_model_1.Wallet, isArray: true }),
    (0, mongoose_1.Prop)([
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: wallet_model_1.Wallet.name,
            autopopulate: true,
        },
    ]),
    __metadata("design:type", Array)
], User.prototype, "wallet", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => bank_account_model_1.BankAccount, isArray: true }),
    (0, mongoose_1.Prop)([
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: bank_account_model_1.BankAccount.name,
            autopopulate: true,
        },
    ]),
    __metadata("design:type", Array)
], User.prototype, "bankAccounts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => User_1, isArray: true }),
    (0, mongoose_1.Prop)([
        { type: mongoose.Schema.Types.ObjectId, ref: 'User', autopopulate: true },
    ]),
    __metadata("design:type", Array)
], User.prototype, "students", void 0);
User = User_1 = __decorate([
    (0, mongoose_1.Schema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.model.js.map