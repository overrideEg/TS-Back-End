"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnBoardingModule = void 0;
const common_1 = require("@nestjs/common");
const on_boarding_service_1 = require("./on-boarding.service");
const on_boarding_controller_1 = require("./on-boarding.controller");
const mongoose_1 = require("@nestjs/mongoose");
const on_boarding_model_1 = require("../../models/on-boarding.model");
let OnBoardingModule = class OnBoardingModule {
};
OnBoardingModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: on_boarding_model_1.OnBoarding.name,
                    useFactory: () => {
                        const schema = on_boarding_model_1.OnBoardingSchema;
                        schema.plugin(require('mongoose-autopopulate'));
                        return schema;
                    },
                },
            ]),
        ],
        controllers: [on_boarding_controller_1.OnBoardingController],
        providers: [on_boarding_service_1.OnBoardingService],
    })
], OnBoardingModule);
exports.OnBoardingModule = OnBoardingModule;
//# sourceMappingURL=on-boarding.module.js.map