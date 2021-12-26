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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const change_password_dto_1 = require("./DTOs/change-password.dto");
const login_dto_1 = require("./DTOs/login.dto");
const refreshToken_dto_1 = require("./DTOs/refreshToken.dto");
const register_dto_1 = require("./DTOs/register.dto");
const client_guard_1 = require("./security/client.guard");
const jwt_auth_guard_1 = require("./security/jwt-auth.guard");
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
    }
    login(body) {
        return this.service.login(body);
    }
    activate(req, code) {
        return this.service.activate(req, code);
    }
    refreshToken(refresh) {
        return this.service.refreshToken(refresh);
    }
    requestToken(macAddress) {
        return this.service.requestToken(macAddress);
    }
    resetPassword(username) {
        return this.service.resetPassword(username);
    }
    newPassword(req, newPass) {
        return this.service.newPassword(req, newPass);
    }
    changePassword(req, changePassword) {
        return this.service.changePassword(req, changePassword);
    }
    resendCode(req) {
        return this.service.resendCode(req);
    }
    registerAdmin(body) {
        return this.service.registerAdmin(body);
    }
    registerStudent(body) {
        return this.service.registerStudent(body);
    }
    registerTeacher(body) {
        return this.service.registerTeacher(body);
    }
    registerParent(body) {
        return this.service.registerParent(body);
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UseGuards)(client_guard_1.ClientGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.Login]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Put)('/activate/:code'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "activate", null);
__decorate([
    (0, common_1.Put)('/refreshToken'),
    (0, common_1.UseGuards)(client_guard_1.ClientGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refreshToken_dto_1.refreshToken]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Put)('/requestToken/:macAddress'),
    (0, common_1.UseGuards)(client_guard_1.ClientGuard),
    __param(0, (0, common_1.Param)('macAddress')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "requestToken", null);
__decorate([
    (0, common_1.Get)('/resetPassword/:username'),
    (0, common_1.UseGuards)(client_guard_1.ClientGuard),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Put)('/newPassword'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_1.ResetPassword]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "newPassword", null);
__decorate([
    (0, common_1.Put)('/changePassword'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, change_password_dto_1.ChangePassword]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('/resendCode'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resendCode", null);
__decorate([
    (0, common_1.Post)('/register/admin'),
    (0, common_1.UseGuards)(client_guard_1.ClientGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterAdmin]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registerAdmin", null);
__decorate([
    (0, common_1.Post)('/register/student'),
    (0, common_1.UseGuards)(client_guard_1.ClientGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterStudent]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registerStudent", null);
__decorate([
    (0, common_1.Post)('/register/teacher'),
    (0, common_1.UseGuards)(client_guard_1.ClientGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterTeacher]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registerTeacher", null);
__decorate([
    (0, common_1.Post)('/register/parent'),
    (0, common_1.UseGuards)(client_guard_1.ClientGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterParent]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registerParent", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map