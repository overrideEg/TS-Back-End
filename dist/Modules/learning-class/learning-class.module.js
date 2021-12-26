"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LearningClassModule = void 0;
const common_1 = require("@nestjs/common");
const learning_class_service_1 = require("./learning-class.service");
const learning_class_gateway_1 = require("./learning-class.gateway");
const mongoose_1 = require("@nestjs/mongoose");
const learning_class_model_1 = require("../../models/learning-class.model");
const learning_class_controller_1 = require("./learning-class.controller");
const auth_module_1 = require("../auth/auth.module");
const course_module_1 = require("../course/course.module");
const checkout_module_1 = require("../checkout/checkout.module");
const notice_module_1 = require("../notice/notice.module");
let LearningClassModule = class LearningClassModule {
};
LearningClassModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: learning_class_model_1.LearningClass.name,
                    useFactory: () => {
                        const schema = learning_class_model_1.LearningClassSchema;
                        schema.plugin(require('mongoose-autopopulate'));
                        return schema;
                    },
                },
            ]),
            auth_module_1.AuthModule,
            checkout_module_1.CheckoutModule,
            course_module_1.CourseModule,
            notice_module_1.NoticeModule,
        ],
        controllers: [learning_class_controller_1.LearningClassController],
        providers: [learning_class_gateway_1.LearningClassGateway, learning_class_service_1.LearningClassService],
    })
], LearningClassModule);
exports.LearningClassModule = LearningClassModule;
//# sourceMappingURL=learning-class.module.js.map