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
exports.PromotionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const promotion_model_1 = require("../../models/promotion.model");
const checkout_service_1 = require("../checkout/checkout.service");
let PromotionService = class PromotionService {
    constructor(PromotionModel, checkoutService) {
        this.PromotionModel = PromotionModel;
        this.checkoutService = checkoutService;
    }
    async save(req) {
        let saved = await this.PromotionModel.create(req);
        return saved;
    }
    async getPromotionByCode(code) {
        let promotion = await this.PromotionModel.findOne({
            code: code,
            fromDate: { $lte: Date.now() },
            toDate: { $gte: Date.now() },
        });
        if (!promotion) {
            throw new common_1.BadRequestException(`promotion with code ${code} not found`);
        }
        if (promotion.useOnce) {
            if (await this.checkoutService.CheckoutModel.exists({ promoCode: code })) {
                throw new common_1.BadRequestException(`promotion with code ${code} is used before`);
            }
        }
        return promotion;
    }
    async findAll() {
        return this.PromotionModel.find().exec();
    }
    async findOne(id) {
        return this.PromotionModel.findById(id).exec();
    }
    async update(id, req) {
        await this.PromotionModel.findByIdAndUpdate(id, req);
        return this.findOne(id);
    }
    async remove(id) {
        return await this.PromotionModel.findByIdAndRemove(id);
    }
};
PromotionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(promotion_model_1.Promotion.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => checkout_service_1.CheckoutService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        checkout_service_1.CheckoutService])
], PromotionService);
exports.PromotionService = PromotionService;
//# sourceMappingURL=promotion.service.js.map