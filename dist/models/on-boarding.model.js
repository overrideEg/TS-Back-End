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
exports.OnBoardingSchema = exports.OnBoarding = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_entity_1 = require("../shared/base-entity");
const swagger_1 = require("@nestjs/swagger");
const localized_1 = require("../shared/localized");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let OnBoarding = class OnBoarding extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => localized_1.Localized }),
    (0, mongoose_1.Prop)({ type: () => localized_1.Localized }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => localized_1.Localized),
    __metadata("design:type", localized_1.Localized)
], OnBoarding.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OnBoarding.prototype, "priority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnBoarding.prototype, "image", void 0);
OnBoarding = __decorate([
    (0, mongoose_1.Schema)()
], OnBoarding);
exports.OnBoarding = OnBoarding;
exports.OnBoardingSchema = mongoose_1.SchemaFactory.createForClass(OnBoarding);
//# sourceMappingURL=on-boarding.model.js.map