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
exports.PricingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const pricing_model_1 = require("../../models/pricing.model");
let PricingService = class PricingService {
    constructor(PricingModel) {
        this.PricingModel = PricingModel;
    }
    async save(req) {
        let currentPricings = await this.getCurrentPricings();
        if (currentPricings['_id']) {
            return this.update(currentPricings['_id'].toString(), req);
        }
        return await this.PricingModel.create(req);
    }
    async getCurrentPricings() {
        let currentPricings = await this.PricingModel.findOne().exec();
        if (!currentPricings) {
            let pricing = new pricing_model_1.Pricing();
            pricing.sessionAndroidId = '';
            pricing.sessionAndroidPrice = 100;
            pricing.sessionAppleId = '';
            pricing.sessionApplePrice = 100;
            pricing.sessionWebPrice = 100;
            pricing.tutorialAndroidId = '';
            pricing.tutorialAndroidPrice = 100;
            pricing.tutorialAppleId = '';
            pricing.tutorialApplePrice = 100;
            pricing.tutorialWebPrice = 100;
            return pricing;
        }
        return currentPricings;
    }
    async findOne(id) {
        return this.PricingModel.findById(id).exec();
    }
    async update(id, req) {
        await this.PricingModel.findByIdAndUpdate(id, req);
        return this.findOne(id);
    }
};
PricingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(pricing_model_1.Pricing.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PricingService);
exports.PricingService = PricingService;
//# sourceMappingURL=pricing.service.js.map