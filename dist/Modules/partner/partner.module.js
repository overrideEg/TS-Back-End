"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerModule = void 0;
const common_1 = require("@nestjs/common");
const partner_service_1 = require("./partner.service");
const partner_controller_1 = require("./partner.controller");
const mongoose_1 = require("@nestjs/mongoose");
const partner_model_1 = require("../../models/partner.model");
let PartnerModule = class PartnerModule {
};
PartnerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: partner_model_1.Partner.name,
                    useFactory: () => {
                        const schema = partner_model_1.PartnerSchema;
                        schema.plugin(require('mongoose-autopopulate'));
                        return schema;
                    },
                },
            ]),
        ],
        controllers: [partner_controller_1.PartnerController],
        providers: [partner_service_1.PartnerService],
        exports: [partner_service_1.PartnerService],
    })
], PartnerModule);
exports.PartnerModule = PartnerModule;
//# sourceMappingURL=partner.module.js.map