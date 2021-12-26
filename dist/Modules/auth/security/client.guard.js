"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const constants_1 = require("./constants");
let ClientGuard = class ClientGuard extends (0, passport_1.AuthGuard)('authEndPoint') {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }
    validateRequest(req) {
        let token;
        const authHeader = req.headers['authorization'];
        if (authHeader) {
            token = authHeader.substr(7);
        }
        else
            throw new common_1.UnauthorizedException('You Are Can Not Login Auth Token is Required');
        if (!authHeader.startsWith('Bearer')) {
            throw new common_1.UnauthorizedException('You Are Can Not Login Must a Bearer Token');
        }
        else if (token !== constants_1.jwtConstants.authToken) {
            throw new common_1.UnauthorizedException('You Are Can Not Login Auth is Invalid');
        }
        else {
            return true;
        }
    }
};
ClientGuard = __decorate([
    (0, common_1.Injectable)()
], ClientGuard);
exports.ClientGuard = ClientGuard;
//# sourceMappingURL=client.guard.js.map