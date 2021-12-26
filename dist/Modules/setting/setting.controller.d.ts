import { SettingService } from './setting.service';
import { Setting } from '../../Models/setting.model';
export declare class SettingController {
    private service;
    constructor(service: SettingService);
    saveHome(req: Setting): Promise<Setting>;
    getHome(): Promise<Setting>;
}
