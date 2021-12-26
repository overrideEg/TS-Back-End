import { Model } from 'mongoose';
import { SettingDocument, Setting } from '../../models/setting.model';
export declare class SettingService {
    private SettingModel;
    constructor(SettingModel: Model<SettingDocument>);
    save(req: Setting): Promise<Setting>;
    getCurrentSettings(): Promise<Setting>;
    findOne(id: string): Promise<Setting>;
    update(id: string, req: Setting): Promise<Setting>;
}
