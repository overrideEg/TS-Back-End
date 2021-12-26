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
exports.LearningClassController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const start_live_dto_1 = require("../../dtos/start-live.dto");
const jwt_auth_guard_1 = require("../auth/security/jwt-auth.guard");
const learning_class_service_1 = require("./learning-class.service");
let LearningClassController = class LearningClassController {
    constructor(service) {
        this.service = service;
    }
    async startLive(req, body) {
        let user = await this.service.authenticationService.getUserFromAuthenticationToken(body.token);
    }
    async join(req, body) {
        let user = await this.service.authenticationService.getUserFromAuthenticationToken(body.token);
    }
    async endLive(req, body) {
        let user = await this.service.authenticationService.getUserFromAuthenticationToken(body.token);
    }
    async leave(req, body) {
        let user = await this.service.authenticationService.getUserFromAuthenticationToken(body.token);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('startLive'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, start_live_dto_1.StartLiveDTO]),
    __metadata("design:returntype", Promise)
], LearningClassController.prototype, "startLive", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('join'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, start_live_dto_1.StartLiveDTO]),
    __metadata("design:returntype", Promise)
], LearningClassController.prototype, "join", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('endLive'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, start_live_dto_1.StartLiveDTO]),
    __metadata("design:returntype", Promise)
], LearningClassController.prototype, "endLive", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('leave'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, start_live_dto_1.StartLiveDTO]),
    __metadata("design:returntype", Promise)
], LearningClassController.prototype, "leave", null);
LearningClassController = __decorate([
    (0, swagger_1.ApiTags)('LearningClass'),
    (0, common_1.Controller)('LearningClass'),
    __metadata("design:paramtypes", [learning_class_service_1.LearningClassService])
], LearningClassController);
exports.LearningClassController = LearningClassController;
//# sourceMappingURL=learning-class.controller.js.map