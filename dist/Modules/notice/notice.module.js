"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeModule = void 0;
const common_1 = require("@nestjs/common");
const notice_service_1 = require("./notice.service");
const notice_controller_1 = require("./notice.controller");
const mongoose_1 = require("@nestjs/mongoose");
const notice_model_1 = require("../../models/notice.model");
const user_module_1 = require("../user/user.module");
let NoticeModule = class NoticeModule {
};
NoticeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: notice_model_1.Notice.name,
                    useFactory: async () => {
                        const schema = notice_model_1.NoticeSchema;
                        schema.plugin(require('mongoose-autopopulate'));
                        return schema;
                    },
                },
            ]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        controllers: [notice_controller_1.NoticeController],
        providers: [notice_service_1.NoticeService],
        exports: [notice_service_1.NoticeService],
    })
], NoticeModule);
exports.NoticeModule = NoticeModule;
//# sourceMappingURL=notice.module.js.map