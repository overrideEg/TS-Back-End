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
exports.NoticeSchema = exports.Notice = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const base_entity_1 = require("../shared/base-entity");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const user_model_1 = require("./user.model");
let Notice = class Notice extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'valueDate', required: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Notice.prototype, "valueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_model_1.User }),
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: user_model_1.User.name,
        autopopulate: true,
    }),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", user_model_1.User)
], Notice.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], Notice.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], Notice.prototype, "body", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], Notice.prototype, "entityType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Allow)(),
    __metadata("design:type", String)
], Notice.prototype, "entityId", void 0);
Notice = __decorate([
    (0, mongoose_1.Schema)()
], Notice);
exports.Notice = Notice;
exports.NoticeSchema = mongoose_1.SchemaFactory.createForClass(Notice);
//# sourceMappingURL=notice.model.js.map