"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckoutModule = void 0;
const common_1 = require("@nestjs/common");
const checkout_service_1 = require("./checkout.service");
const checkout_controller_1 = require("./checkout.controller");
const mongoose_1 = require("@nestjs/mongoose");
const checkout_model_1 = require("../../models/checkout.model");
const course_module_1 = require("../course/course.module");
const user_module_1 = require("../user/user.module");
const promotion_module_1 = require("../promotion/promotion.module");
const notice_module_1 = require("../notice/notice.module");
const axios_1 = require("@nestjs/axios");
const pricing_module_1 = require("../pricing/pricing.module");
let CheckoutModule = class CheckoutModule {
};
CheckoutModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: checkout_model_1.Checkout.name,
                    useFactory: async () => {
                        const schema = checkout_model_1.CheckoutSchema;
                        schema.plugin(require('mongoose-autopopulate'));
                        return schema;
                    },
                },
            ]),
            (0, common_1.forwardRef)(() => course_module_1.CourseModule),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => promotion_module_1.PromotionModule),
            notice_module_1.NoticeModule,
            axios_1.HttpModule,
            pricing_module_1.PricingModule,
        ],
        controllers: [checkout_controller_1.CheckoutController],
        providers: [checkout_service_1.CheckoutService],
        exports: [checkout_service_1.CheckoutService],
    })
], CheckoutModule);
exports.CheckoutModule = CheckoutModule;
//# sourceMappingURL=checkout.module.js.map