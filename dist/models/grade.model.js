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
exports.GradeSchema = exports.Grade = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const base_entity_1 = require("../shared/base-entity");
const localized_1 = require("../shared/localized");
const swagger_1 = require("@nestjs/swagger");
const stage_model_1 = require("./stage.model");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let Grade = class Grade extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => localized_1.Localized }),
    (0, mongoose_1.Prop)({ type: () => localized_1.Localized }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => localized_1.Localized),
    __metadata("design:type", localized_1.Localized)
], Grade.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Grade.prototype, "gradeNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => stage_model_1.Stage }),
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: stage_model_1.Stage.name,
        autopopulate: true,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", stage_model_1.Stage)
], Grade.prototype, "stage", void 0);
Grade = __decorate([
    (0, mongoose_1.Schema)()
], Grade);
exports.Grade = Grade;
exports.GradeSchema = mongoose_1.SchemaFactory.createForClass(Grade);
//# sourceMappingURL=grade.model.js.map