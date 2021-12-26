import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SettingDocument, Setting } from '../../models/setting.model';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(Setting.name) private SettingModel: Model<SettingDocument>,
  ) {}

  // save Setting Created By Override
  async save(req: Setting) {
    let currentSettings = await this.getCurrentSettings();
    if (currentSettings['_id']) {
      return this.update(currentSettings['_id'].toString(), req);
    }
    return await this.SettingModel.create(req);
  }

  // findAll Settings Created By Override
  async getCurrentSettings(): Promise<Setting> {
    let currentSettings = await this.SettingModel.findOne().exec();
    if (!currentSettings) {
      let setting = new Setting();

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

  // findOne Settings Created By Override
  async findOne(id: string): Promise<Setting> {
    return this.SettingModel.findById(id).exec();
  }

  // update Settings Created By Override
  async update(id: string, req: Setting): Promise<Setting> {
    await this.SettingModel.findByIdAndUpdate(id, req);
    return this.findOne(id);
  }
}
