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
exports.PricingSchema = exports.Pricing = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_entity_1 = require("../shared/base-entity");
const swagger_1 = require("@nestjs/swagger");
let Pricing = class Pricing extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: String }),
    __metadata("design:type", Object)
], Pricing.prototype, "_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'createdAt', required: true }),
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", Number)
], Pricing.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'updatedAt', required: true }),
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", String)
], Pricing.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'sessionAppleId', required: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Pricing.prototype, "sessionAppleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'sessionApplePrice', required: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Pricing.prototype, "sessionApplePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'sessionAndroidId', required: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Pricing.prototype, "sessionAndroidId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'sessionAndroidPrice', required: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Pricing.prototype, "sessionAndroidPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'sessionWebPrice', required: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Pricing.prototype, "sessionWebPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'tutorialAppleId', required: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Pricing.prototype, "tutorialAppleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'tutorialApplePrice', required: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Pricing.prototype, "tutorialApplePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'tutorialAndroidId', required: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Pricing.prototype, "tutorialAndroidId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'tutorialAndroidPrice', required: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Pricing.prototype, "tutorialAndroidPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'tutorialWebPrice', required: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Pricing.prototype, "tutorialWebPrice", void 0);
Pricing = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        skipVersioning: true,
    })
], Pricing);
exports.Pricing = Pricing;
exports.PricingSchema = mongoose_1.SchemaFactory.createForClass(Pricing);
//# sourceMappingURL=pricing.model.js.map