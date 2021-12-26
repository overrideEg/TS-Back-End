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
exports.PricingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const pricing_model_1 = require("../../models/pricing.model");
const jwt_auth_guard_1 = require("../auth/security/jwt-auth.guard");
const roles_decorator_1 = require("../auth/security/roles.decorator");
const pricing_service_1 = require("./pricing.service");
let PricingController = class PricingController {
    constructor(service) {
        this.service = service;
    }
    async saveHome(req) {
        return this.service.save(req);
    }
    getHome() {
        return this.service.getCurrentPricings();
    }
};
__decorate([
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pricing_model_1.Pricing]),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "saveHome", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PricingController.prototype, "getHome", null);
PricingController = __decorate([
    (0, swagger_1.ApiTags)('Pricing'),
    (0, common_1.Controller)('Pricing'),
    __metadata("design:paramtypes", [pricing_service_1.PricingService])
], PricingController);
exports.PricingController = PricingController;
//# sourceMappingURL=pricing.controller.js.map