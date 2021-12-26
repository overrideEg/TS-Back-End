"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const cart_module_1 = require("./modules/cart/cart.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const schedule_1 = require("@nestjs/schedule");
const file_module_1 = require("./modules/file/file.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const logger_middleware_1 = require("./shared/logger.middleware");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const city_module_1 = require("./modules/city/city.module");
const stage_module_1 = require("./modules/stage/stage.module");
const grade_module_1 = require("./modules/grade/grade.module");
const on_boarding_module_1 = require("./modules/on-boarding/on-boarding.module");
const banner_module_1 = require("./modules/banner/banner.module");
const subject_module_1 = require("./modules/subject/subject.module");
const promotion_module_1 = require("./modules/promotion/promotion.module");
const course_module_1 = require("./modules/course/course.module");
const search_module_1 = require("./modules/search/search.module");
const checkout_module_1 = require("./modules/checkout/checkout.module");
const learning_class_module_1 = require("./modules/learning-class/learning-class.module");
const partner_module_1 = require("./modules/partner/partner.module");
const home_module_1 = require("./modules/home/home.module");
const contact_us_module_1 = require("./modules/contact-us/contact-us.module");
const notice_module_1 = require("./modules/notice/notice.module");
const setting_module_1 = require("./modules/setting/setting.module");
const pricing_module_1 = require("./modules/pricing/pricing.module");
const overrideMoules = [
    file_module_1.FileModule,
    auth_module_1.AuthModule,
    user_module_1.UserModule,
    city_module_1.CityModule,
    stage_module_1.StageModule,
    grade_module_1.GradeModule,
    on_boarding_module_1.OnBoardingModule,
    banner_module_1.BannerModule,
    subject_module_1.SubjectModule,
    promotion_module_1.PromotionModule,
    setting_module_1.SettingModule,
    course_module_1.CourseModule,
    cart_module_1.CartModule,
    search_module_1.SearchModule,
    checkout_module_1.CheckoutModule,
    partner_module_1.PartnerModule,
    home_module_1.HomeModule,
    learning_class_module_1.LearningClassModule,
    contact_us_module_1.ContactUsModule,
    notice_module_1.NoticeModule,
    pricing_module_1.PricingModule,
];
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(logger_middleware_1.LoggerMiddleware).forRoutes({
            path: '',
            method: common_1.RequestMethod.ALL,
        });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(`mongodb://${process.env.db_host}/?readPreference=primary&appname=MongoDB%20Compass&ssl=false`, {
                dbName: 'ts-academy',
                ssl: false,
                auth: {
                    username: process.env.db_user,
                    password: process.env.db_pwd,
                },
                connectionFactory: (connection) => {
                    connection.on('connected', () => {
                        console.log('DB is connected');
                    });
                    connection.on('disconnected', () => {
                        console.log('DB disconnected');
                    });
                    connection.on('error', (error) => {
                        console.log('DB connection failed! for error: ', error);
                    });
                    connection.plugin(require('mongoose-autopopulate'));
                    return connection;
                },
            }),
            common_1.CacheModule.register(),
            schedule_1.ScheduleModule.forRoot(),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 10,
                limit: 999999,
            }),
            ...overrideMoules,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_PIPE,
                useClass: common_1.ValidationPipe,
            },
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map