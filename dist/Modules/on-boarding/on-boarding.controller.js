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
exports.OnBoardingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const on_boarding_model_1 = require("../../models/on-boarding.model");
const jwt_auth_guard_1 = require("../auth/security/jwt-auth.guard");
const on_boarding_service_1 = require("./on-boarding.service");
let OnBoardingController = class OnBoardingController {
    constructor(service) {
        this.service = service;
    }
    async saveOnBoarding(req) {
        return this.service.save(req);
    }
    getAllOnBoardings() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    updateOnBoarding(id, req) {
        return this.service.update(id, req);
    }
    deleteOnBoarding(id) {
        return this.service.remove(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [on_boarding_model_1.OnBoarding]),
    __metadata("design:returntype", Promise)
], OnBoardingController.prototype, "saveOnBoarding", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OnBoardingController.prototype, "getAllOnBoardings", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OnBoardingController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, on_boarding_model_1.OnBoarding]),
    __metadata("design:returntype", Promise)
], OnBoardingController.prototype, "updateOnBoarding", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OnBoardingController.prototype, "deleteOnBoarding", null);
OnBoardingController = __decorate([
    (0, swagger_1.ApiTags)('OnBoarding'),
    (0, common_1.Controller)('OnBoarding'),
    __metadata("design:paramtypes", [on_boarding_service_1.OnBoardingService])
], OnBoardingController);
exports.OnBoardingController = OnBoardingController;
//# sourceMappingURL=on-boarding.controller.js.map