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
exports.NoticeController = void 0;
const common_1 = require("@nestjs/common");
const notice_service_1 = require("./notice.service");
const swagger_1 = require("@nestjs/swagger");
const notice_model_1 = require("../../models/notice.model");
const jwt_auth_guard_1 = require("../auth/security/jwt-auth.guard");
let NoticeController = class NoticeController {
    constructor(service) {
        this.service = service;
    }
    async SendNotification(req) {
        return this.service.sendNotification(req);
    }
    getAllNotices(req) {
        return this.service.findAll(req);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notice_model_1.Notice]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "SendNotification", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/my'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NoticeController.prototype, "getAllNotices", null);
NoticeController = __decorate([
    (0, swagger_1.ApiTags)('Notice'),
    (0, common_1.Controller)('Notice'),
    __metadata("design:paramtypes", [notice_service_1.NoticeService])
], NoticeController);
exports.NoticeController = NoticeController;
//# sourceMappingURL=notice.controller.js.map