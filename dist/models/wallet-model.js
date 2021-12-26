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
exports.WalletSchema = exports.Wallet = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const base_entity_1 = require("../shared/base-entity");
const swagger_1 = require("@nestjs/swagger");
const wallet_enum_1 = require("../enums/wallet.enum");
const bank_account_model_1 = require("./bank-account.model");
const checkout_model_1 = require("./checkout.model");
const course_model_1 = require("./course/course.model");
const status_enum_1 = require("../enums/status.enum");
let Wallet = class Wallet extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Wallet.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Wallet.prototype, "value", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: [wallet_enum_1.TransactionType.in, wallet_enum_1.TransactionType.out] }),
    (0, mongoose_1.Prop)({ enum: [wallet_enum_1.TransactionType.in, wallet_enum_1.TransactionType.out] }),
    __metadata("design:type", String)
], Wallet.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: [status_enum_1.Status.pending, status_enum_1.Status.approved],
        default: status_enum_1.Status.pending,
    }),
    (0, mongoose_1.Prop)({ enum: [status_enum_1.Status.pending, status_enum_1.Status.approved], default: status_enum_1.Status.pending }),
    __metadata("design:type", String)
], Wallet.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => checkout_model_1.Checkout }),
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: checkout_model_1.Checkout.name,
        autopopulate: true,
    }),
    __metadata("design:type", checkout_model_1.Checkout)
], Wallet.prototype, "checkout", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => course_model_1.Course }),
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        autopopulate: true,
    }),
    __metadata("design:type", course_model_1.Course)
], Wallet.prototype, "course", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => bank_account_model_1.BankAccount }),
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: bank_account_model_1.BankAccount.name,
        autopopulate: true,
    }),
    __metadata("design:type", bank_account_model_1.BankAccount)
], Wallet.prototype, "account", void 0);
Wallet = __decorate([
    (0, mongoose_1.Schema)()
], Wallet);
exports.Wallet = Wallet;
exports.WalletSchema = mongoose_1.SchemaFactory.createForClass(Wallet);
//# sourceMappingURL=wallet-model.js.map