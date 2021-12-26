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
exports.RegisterParent = exports.RegisterTeacher = exports.RegisterStudent = exports.RegisterAdmin = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const lang_enum_1 = require("../../../shared/enums/lang.enum");
class RegisterAdmin {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterAdmin.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], RegisterAdmin.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(9),
    __metadata("design:type", String)
], RegisterAdmin.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(16),
    __metadata("design:type", String)
], RegisterAdmin.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: lang_enum_1.Lang.en, enum: [lang_enum_1.Lang.en, lang_enum_1.Lang.ar] }),
    (0, class_validator_1.IsEnum)(lang_enum_1.Lang),
    __metadata("design:type", String)
], RegisterAdmin.prototype, "defaultLang", void 0);
exports.RegisterAdmin = RegisterAdmin;
class RegisterStudent extends (0, swagger_1.PartialType)(RegisterAdmin) {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStudent.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStudent.prototype, "gradeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterStudent.prototype, "stageId", void 0);
exports.RegisterStudent = RegisterStudent;
class RegisterTeacher extends (0, swagger_1.PartialType)(RegisterAdmin) {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterTeacher.prototype, "cityId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterTeacher.prototype, "additionalPhone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterTeacher.prototype, "resume", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterTeacher.prototype, "coverLetter", void 0);
exports.RegisterTeacher = RegisterTeacher;
class RegisterParent extends (0, swagger_1.PartialType)(RegisterAdmin) {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterParent.prototype, "studentId", void 0);
exports.RegisterParent = RegisterParent;
//# sourceMappingURL=register.dto.js.map