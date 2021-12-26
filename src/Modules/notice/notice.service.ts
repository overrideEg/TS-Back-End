import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Notice, NoticeDocument } from '../../models/notice.model';
import * as admin from 'firebase-admin';
import { UserType } from '../../models/user.model';
import { UserService } from '../user/user.service';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class NoticeService {


  constructor(
    @InjectModel(Notice.name) private repo: Model<NoticeDocument>,
    @Inject(forwardRef(() => UserService)) private userService: UserService,

  ) { }


  async findAll(req): Promise<Notice[]> {
    return this.repo.find({ user: new ObjectId(req.user._id) }).sort({ valueDate: 'desc' }).exec();
  }


  async sendNotification(req: Notice): Promise<Notice | PromiseLike<Notice>> {
    if (req.user)
      return this.sendSpecificNotification({
        userId: req.user['_id'],
        notification: { title: req.title, body: req.body },
        data: req.entityType && req.entityId ? { entityType: req.entityType, entityId: req.entityId } : null
      })
    else {
      let users = await this.userService.findAll(UserType.student);
      for await (const user of users) {
        await this.sendSpecificNotification({
          userId: user['_id'],
          notification: { title: req.title, body: req.body },
          data: req.entityType && req.entityId ? { entityType: req.entityType, entityId: req.entityId } : null
        })
      }
    }
  }
  protected readonly logger = new Logger(NoticeService.name);

  async sendSpecificNotification({ userId, notification, data, imageURL }: { userId: string, notification: { title: string, body: string }, data?: { entityType: string, entityId: string }, imageURL?: string }) {
    let user = await (await this.userService.UserModel.findById(userId).exec()).toObject();
    let notice = new Notice();
    // if (user.fcmTokens.length > 0) {
    //   const message: admin.messaging.MessagingPayload = {
    //     notification: {
    //       title: notification.title,
    //       body: notification.body,
    //     }

    //   };
    //   if (data) {
    //     message.data = {
    //       entityType: data.entityType,
    //       entityId: data.entityId.toString(),
    //     }
    //     if (imageURL) {
    //       message.data['imageURL'] = imageURL
    //     }

    //   }


    //   admin.messaging().sendToDevice(user.fcmTokens.filter(tok => tok != ""), message).then(res => {
    //     if (res.successCount > 0) {
    //       this.logger.log(`success notification sent to user ${user.email} success ${res.successCount}`)
    //     }
    //     if (res.failureCount > 0) {
    //       this.logger.error(`fail notification sent to user ${user.email} fail ${res.failureCount}`)

    //     }
    //   }).catch(err => {
    //     this.logger.error(err)
    //   });
    // }
    notice.user = new ObjectId(userId);
    notice.title = notification.title;
    notice.body = notification.body;
    notice.valueDate = Date.now()
    if (data) {
      notice.entityType = data.entityType;
      notice.entityId = data.entityId;

    }
    return this.repo.create(notice);
  }

}