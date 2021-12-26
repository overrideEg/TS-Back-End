"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("../../models/user.model");
const course_module_1 = require("../course/course.module");
const checkout_module_1 = require("../checkout/checkout.module");
const bank_account_model_1 = require("../../models/bank-account.model");
const wallet_model_1 = require("../../models/wallet-model");
const student_review_model_1 = require("../../models/student-review.model");
const notice_module_1 = require("../notice/notice.module");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: user_model_1.User.name,
                    useFactory: async () => {
                        const schema = user_model_1.UserSchema;
                        schema.plugin(require('mongoose-autopopulate'));
                        return schema;
                    },
                },
                {
                    name: bank_account_model_1.BankAccount.name,
                    useFactory: async () => {
                        const schema = bank_account_model_1.BankAccountSchema;
                        schema.plugin(require('mongoose-autopopulate'));
                        return schema;
                    },
                },
                {
                    name: wallet_model_1.Wallet.name,
                    useFactory: async () => {
                        const schema = wallet_model_1.WalletSchema;
                        schema.plugin(require('mongoose-autopopulate'));
                        return schema;
                    },
                },
                {
                    name: student_review_model_1.StudentReview.name,
                    useFactory: async () => {
                        const schema = student_review_model_1.StudentReviewSchema;
                        schema.plugin(require('mongoose-autopopulate'));
                        return schema;
                    },
                },
            ]),
            (0, common_1.forwardRef)(() => checkout_module_1.CheckoutModule),
            (0, common_1.forwardRef)(() => course_module_1.CourseModule),
            (0, common_1.forwardRef)(() => notice_module_1.NoticeModule),
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService],
        exports: [user_service_1.UserService],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map