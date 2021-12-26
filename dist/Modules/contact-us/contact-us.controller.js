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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contact_us_model_1 = require("../../models/contact-us.model");
const jwt_auth_guard_1 = require("../auth/security/jwt-auth.guard");
const contact_us_service_1 = require("./contact-us.service");
let ContactUsController = class ContactUsController {
    constructor(service) {
        this.service = service;
    }
    async saveContactUs(req) {
        return this.service.save(req);
    }
    getAllContactUss() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    updateContactUs(id, req) {
        return this.service.update(id, req);
    }
    deleteContactUs(id) {
        return this.service.remove(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_us_model_1.ContactUs]),
    __metadata("design:returntype", Promise)
], ContactUsController.prototype, "saveContactUs", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContactUsController.prototype, "getAllContactUss", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactUsController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contact_us_model_1.ContactUs]),
    __metadata("design:returntype", Promise)
], ContactUsController.prototype, "updateContactUs", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ContactUsController.prototype, "deleteContactUs", null);
ContactUsController = __decorate([
    (0, swagger_1.ApiTags)('ContactUs'),
    (0, common_1.Controller)('ContactUs'),
    __metadata("design:paramtypes", [contact_us_service_1.ContactUsService])
], ContactUsController);
exports.ContactUsController = ContactUsController;
//# sourceMappingURL=contact-us.controller.js.map