"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseModule = void 0;
const common_1 = require("@nestjs/common");
const course_service_1 = require("./course.service");
const course_controller_1 = require("./course.controller");
const mongoose_1 = require("@nestjs/mongoose");
const course_model_1 = require("../../models/course/course.model");
const user_module_1 = require("../user/user.module");
const checkout_module_1 = require("../checkout/checkout.module");
const course_review_model_1 = require("../../models/course/sub-models/course-review.model");
let CourseModule = class CourseModule {
};
CourseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: course_model_1.Course.name,
                    useFactory: () => {
                        const schema = course_model_1.CourseSchema;
                        schema.plugin(require('mongoose-autopopulate'));
                        return schema;
                    },
                },
                {
                    name: course_review_model_1.CourseReview.name,
                    useFactory: () => {
                        const schema = course_review_model_1.CourseReviewSchema;
                        schema.plugin(require('mongoose-autopopulate'));
                        return schema;
                    },
                },
            ]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            (0, common_1.forwardRef)(() => checkout_module_1.CheckoutModule),
        ],
        controllers: [course_controller_1.CourseController],
        providers: [course_service_1.CourseService],
        exports: [course_service_1.CourseService],
    })
], CourseModule);
exports.CourseModule = CourseModule;
//# sourceMappingURL=course.module.js.map