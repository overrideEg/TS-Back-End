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
exports.CheckoutDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const payment_method_enum_1 = require("../enums/payment-method.enum");
const course_model_1 = require("../models/course/course.model");
class CheckoutDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'promoCode', required: false }),
    __metadata("design:type", String)
], CheckoutDTO.prototype, "promoCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CheckoutDTO.prototype, "purchasedFor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => course_model_1.Course, isArray: true, required: true }),
    __metadata("design:type", Array)
], CheckoutDTO.prototype, "courses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: [
            payment_method_enum_1.PaymentMethod.VISA,
            payment_method_enum_1.PaymentMethod.MADA,
            payment_method_enum_1.PaymentMethod.MASTER,
            payment_method_enum_1.PaymentMethod.APPLE,
            payment_method_enum_1.PaymentMethod.ANDROID,
        ],
        required: true,
    }),
    __metadata("design:type", String)
], CheckoutDTO.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CheckoutDTO.prototype, "paymentReffrence", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], CheckoutDTO.prototype, "paidValue", void 0);
exports.CheckoutDTO = CheckoutDTO;
//# sourceMappingURL=checkout-dto.js.map