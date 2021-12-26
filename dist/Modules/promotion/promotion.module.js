"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionModule = void 0;
const common_1 = require("@nestjs/common");
const promotion_service_1 = require("./promotion.service");
const promotion_controller_1 = require("./promotion.controller");
const mongoose_1 = require("@nestjs/mongoose");
const promotion_model_1 = require("../../models/promotion.model");
const checkout_module_1 = require("../checkout/checkout.module");
let PromotionModule = class PromotionModule {
};
PromotionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: promotion_model_1.Promotion.name,
                    useFactory: () => {
                        const schema = promotion_model_1.PromotionSchema;
                        schema.plugin(require('mongoose-autopopulate'));
                        return schema;
                    },
                },
            ]),
            (0, common_1.forwardRef)(() => checkout_module_1.CheckoutModule),
        ],
        controllers: [promotion_controller_1.PromotionController],
        providers: [promotion_service_1.PromotionService],
        exports: [promotion_service_1.PromotionService],
    })
], PromotionModule);
exports.PromotionModule = PromotionModule;
//# sourceMappingURL=promotion.module.js.map