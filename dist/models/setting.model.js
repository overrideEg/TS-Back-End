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
exports.SettingSchema = exports.Setting = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_entity_1 = require("../shared/base-entity");
const swagger_1 = require("@nestjs/swagger");
const localized_1 = require("../shared/localized");
let Setting = class Setting extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: localized_1.Localized, description: 'about', required: true }),
    (0, mongoose_1.Prop)({ type: localized_1.Localized }),
    __metadata("design:type", localized_1.Localized)
], Setting.prototype, "about", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: localized_1.Localized, description: 'terms', required: true }),
    (0, mongoose_1.Prop)({ type: localized_1.Localized }),
    __metadata("design:type", localized_1.Localized)
], Setting.prototype, "terms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: localized_1.Localized, description: 'privacy', required: true }),
    (0, mongoose_1.Prop)({ type: localized_1.Localized }),
    __metadata("design:type", localized_1.Localized)
], Setting.prototype, "privacy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: '', description: 'facebook', required: true }),
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Setting.prototype, "facebook", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: '', description: 'twitter', required: true }),
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Setting.prototype, "twitter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: '', description: 'snapchat', required: true }),
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Setting.prototype, "snapchat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: '', description: 'instagram', required: true }),
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Setting.prototype, "instagram", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: '', description: 'whatsapp', required: true }),
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Setting.prototype, "whatsapp", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: '', description: 'phone number', required: true }),
    (0, mongoose_1.Prop)({ default: '' }),
    __metadata("design:type", String)
], Setting.prototype, "phoneNumber", void 0);
Setting = __decorate([
    (0, mongoose_1.Schema)()
], Setting);
exports.Setting = Setting;
exports.SettingSchema = mongoose_1.SchemaFactory.createForClass(Setting);
//# sourceMappingURL=setting.model.js.map