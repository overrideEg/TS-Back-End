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
exports.SettingService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const setting_model_1 = require("../../models/setting.model");
let SettingService = class SettingService {
    constructor(SettingModel) {
        this.SettingModel = SettingModel;
    }
    async save(req) {
        let currentSettings = await this.getCurrentSettings();
        if (currentSettings['_id']) {
            return this.update(currentSettings['_id'].toString(), req);
        }
        return await this.SettingModel.create(req);
    }
    async getCurrentSettings() {
        let currentSettings = await this.SettingModel.findOne().exec();
        if (!currentSettings) {
            let setting = new setting_model_1.Setting();
            setting.privacy = {
                ar: 'سياسة الخصوصية',
                en: 'Privacy Policy',
            };
            setting.terms = {
                ar: 'الشروط والأحكام',
                en: 'Terms And Conditions',
            };
            setting.about = {
                ar: 'عن التطبيق',
                en: 'about us',
            };
            setting.phoneNumber = '+9665555555555555';
            setting.facebook = 'https://facebook.com/fb';
            setting.twitter = 'https://twitter.com/fb';
            setting.whatsapp = 'https://wa.me/+2123123123123';
            setting.snapchat = 'https://snapchat/+2123123123123';
            setting.instagram = 'https://instagram/+2123123123123';
            return setting;
        }
        return currentSettings;
    }
    async findOne(id) {
        return this.SettingModel.findById(id).exec();
    }
    async update(id, req) {
        await this.SettingModel.findByIdAndUpdate(id, req);
        return this.findOne(id);
    }
};
SettingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(setting_model_1.Setting.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], SettingService);
exports.SettingService = SettingService;
//# sourceMappingURL=setting.service.js.map