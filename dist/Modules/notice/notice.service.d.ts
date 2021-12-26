import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Notice, NoticeDocument } from '../../models/notice.model';
import { UserService } from '../user/user.service';
export declare class NoticeService {
    private repo;
    private userService;
    constructor(repo: Model<NoticeDocument>, userService: UserService);
    findAll(req: any): Promise<Notice[]>;
    sendNotification(req: Notice): Promise<Notice | PromiseLike<Notice>>;
    protected readonly logger: Logger;
    sendSpecificNotification({ userId, notification, data, imageURL, }: {
        userId: string;
        notification: {
            title: string;
            body: string;
        };
        data?: {
            entityType: string;
            entityId: string;
        };
        imageURL?: string;
    }): Promise<Notice & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
}
