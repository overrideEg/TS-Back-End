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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var NoticeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const notice_model_1 = require("../../models/notice.model");
const user_model_1 = require("../../models/user.model");
const user_service_1 = require("../user/user.service");
const ObjectId = require('mongoose').Types.ObjectId;
let NoticeService = NoticeService_1 = class NoticeService {
    constructor(repo, userService) {
        this.repo = repo;
        this.userService = userService;
        this.logger = new common_1.Logger(NoticeService_1.name);
    }
    async findAll(req) {
        return this.repo
            .find({ user: new ObjectId(req.user._id) })
            .sort({ valueDate: 'desc' })
            .exec();
    }
    async sendNotification(req) {
        var e_1, _a;
        if (req.user)
            return this.sendSpecificNotification({
                userId: req.user['_id'],
                notification: { title: req.title, body: req.body },
                data: req.entityType && req.entityId
                    ? { entityType: req.entityType, entityId: req.entityId }
                    : null,
            });
        else {
            let users = await this.userService.findAll(user_model_1.UserType.student);
            try {
                for (var users_1 = __asyncValues(users), users_1_1; users_1_1 = await users_1.next(), !users_1_1.done;) {
                    const user = users_1_1.value;
                    await this.sendSpecificNotification({
                        userId: user['_id'],
                        notification: { title: req.title, body: req.body },
                        data: req.entityType && req.entityId
                            ? { entityType: req.entityType, entityId: req.entityId }
                            : null,
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (users_1_1 && !users_1_1.done && (_a = users_1.return)) await _a.call(users_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    }
    async sendSpecificNotification({ userId, notification, data, imageURL, }) {
        let user = await (await this.userService.UserModel.findById(userId).exec()).toObject();
        let notice = new notice_model_1.Notice();
        notice.user = new ObjectId(userId);
        notice.title = notification.title;
        notice.body = notification.body;
        notice.valueDate = Date.now();
        if (data) {
            notice.entityType = data.entityType;
            notice.entityId = data.entityId;
        }
        return this.repo.create(notice);
    }
};
NoticeService = NoticeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(notice_model_1.Notice.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_service_1.UserService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService])
], NoticeService);
exports.NoticeService = NoticeService;
//# sourceMappingURL=notice.service.js.map