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
exports.CheckoutSchema = exports.Checkout = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const base_entity_1 = require("../shared/base-entity");
const swagger_1 = require("@nestjs/swagger");
const course_model_1 = require("./course/course.model");
const payment_method_enum_1 = require("../enums/payment-method.enum");
const user_model_1 = require("./user.model");
let Checkout = class Checkout extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_model_1.User }),
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true,
    }),
    __metadata("design:type", user_model_1.User)
], Checkout.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'valueDate', required: true }),
    (0, mongoose_1.Prop)({ default: Date.now() }),
    __metadata("design:type", Number)
], Checkout.prototype, "valueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'promoCode', required: false }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Checkout.prototype, "promoCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => course_model_1.Course, isArray: false, required: true }),
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        autopopulate: true,
    }),
    __metadata("design:type", course_model_1.Course)
], Checkout.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'price', required: true }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Checkout.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'PaymentMethod', required: true }),
    (0, mongoose_1.Prop)({
        enum: [
            payment_method_enum_1.PaymentMethod.VISA,
            payment_method_enum_1.PaymentMethod.MADA,
            payment_method_enum_1.PaymentMethod.MASTER,
            payment_method_enum_1.PaymentMethod.APPLE,
            payment_method_enum_1.PaymentMethod.ANDROID,
        ],
    }),
    __metadata("design:type", String)
], Checkout.prototype, "paymentMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: [payment_method_enum_1.PaymentStatus.Paid, payment_method_enum_1.PaymentStatus.Wait],
        required: true,
    }),
    (0, mongoose_1.Prop)({
        enum: [payment_method_enum_1.PaymentStatus.Paid, payment_method_enum_1.PaymentStatus.Wait],
        default: payment_method_enum_1.PaymentStatus.Wait,
    }),
    __metadata("design:type", String)
], Checkout.prototype, "paymentStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'redirect', required: true }),
    (0, mongoose_1.Prop)({ type: mongoose.Schema.Types.Mixed }),
    __metadata("design:type", Object)
], Checkout.prototype, "paymentResult", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'paymentCode', required: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Checkout.prototype, "paymentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'price Before Discount' }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Checkout.prototype, "priceBeforeDiscount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'discount', required: true }),
    (0, mongoose_1.Prop)({ default: 0 }),
    __metadata("design:type", Number)
], Checkout.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'price After Discount', required: true }),
    (0, mongoose_1.Prop)({
        default: function () {
            return this.priceBeforeDiscount - this.discount;
        },
    }),
    __metadata("design:type", Number)
], Checkout.prototype, "priceAfterDiscount", void 0);
Checkout = __decorate([
    (0, mongoose_1.Schema)()
], Checkout);
exports.Checkout = Checkout;
exports.CheckoutSchema = mongoose_1.SchemaFactory.createForClass(Checkout);
//# sourceMappingURL=checkout.model.js.map