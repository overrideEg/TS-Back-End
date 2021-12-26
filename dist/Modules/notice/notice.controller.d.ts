import { NoticeService } from './notice.service';
import { Notice } from '../../models/notice.model';
export declare class NoticeController {
    private service;
    constructor(service: NoticeService);
    SendNotification(req: Notice): Promise<Notice>;
    getAllNotices(req: any): Promise<Notice[]>;
}
