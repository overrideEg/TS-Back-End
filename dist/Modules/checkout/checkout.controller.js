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
exports.CheckoutController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const checkout_dto_1 = require("../../dtos/checkout-dto");
const jwt_auth_guard_1 = require("../auth/security/jwt-auth.guard");
const checkout_service_1 = require("./checkout.service");
let CheckoutController = class CheckoutController {
    constructor(service) {
        this.service = service;
    }
    async checkAndPay(req, body) {
        return this.service.checkAndPay(req, body);
    }
    payment(req, id, paymentMethod) {
        const fullUrl = 'http://' + req.hostname + '/v1';
        return {
            id: id,
            resultUrl: fullUrl + `/Checkout/authorize/${paymentMethod}/${id}`,
        };
    }
    authorize(paymentMethod, id, resourcePath) {
        this.service.authorize(paymentMethod, id, resourcePath);
    }
};
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, checkout_dto_1.CheckoutDTO]),
    __metadata("design:returntype", Promise)
], CheckoutController.prototype, "checkAndPay", null);
__decorate([
    (0, common_1.Get)('payment/:id'),
    (0, common_1.Render)('payment.hbs'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)('paymentMethod')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], CheckoutController.prototype, "payment", null);
__decorate([
    (0, common_1.Redirect)('https://tsacademy.info/homePage', 301),
    (0, common_1.Get)('authorize/:paymentMethod/:paymentId'),
    __param(0, (0, common_1.Param)('paymentMethod')),
    __param(1, (0, common_1.Param)('paymentId')),
    __param(2, (0, common_1.Query)('resourcePath')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], CheckoutController.prototype, "authorize", null);
CheckoutController = __decorate([
    (0, swagger_1.ApiTags)('Checkout'),
    (0, common_1.Controller)('Checkout'),
    __metadata("design:paramtypes", [checkout_service_1.CheckoutService])
], CheckoutController);
exports.CheckoutController = CheckoutController;
//# sourceMappingURL=checkout.controller.js.map