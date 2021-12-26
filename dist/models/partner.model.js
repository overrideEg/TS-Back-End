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
exports.PartnerSchema = exports.Partner = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_entity_1 = require("../shared/base-entity");
const swagger_1 = require("@nestjs/swagger");
let Partner = class Partner extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'name', required: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Partner.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'logo', required: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Partner.prototype, "logo", void 0);
Partner = __decorate([
    (0, mongoose_1.Schema)()
], Partner);
exports.Partner = Partner;
exports.PartnerSchema = mongoose_1.SchemaFactory.createForClass(Partner);
//# sourceMappingURL=partner.model.js.map