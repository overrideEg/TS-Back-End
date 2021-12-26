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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const user_model_1 = require("../../models/user.model");
const override_utils_1 = require("../../shared/override-utils");
const city_model_1 = require("../../models/city.model");
const grade_model_1 = require("../../models/grade.model");
const stage_model_1 = require("../../models/stage.model");
const lang_enum_1 = require("../../shared/enums/lang.enum");
const constants_1 = require("./security/constants");
const axios_1 = require("@nestjs/axios");
let AuthService = class AuthService {
    constructor(userService, jwtService, httpService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.httpService = httpService;
    }
    async getUserFromAuthenticationToken(token) {
        token = token.substr(7);
        try {
            const payload = this.jwtService.verify(token, {
                secret: constants_1.jwtConstants.secret,
            });
            if (payload.id) {
                return this.userService.findOne(payload.id);
            }
        }
        catch (exception) {
            throw new Error('token is invalid');
        }
    }
    sign(user) {
        return this.jwtService.sign({
            _id: user['_id'],
            email: user['email'],
            phone: user['phone'],
            userType: user['userType'],
            defaultLang: user['defaultLang'],
        });
    }
    requestToken(macAddress) {
        return {
            token: this.jwtService.sign({
                _id: null,
                email: null,
                phone: null,
                userType: user_model_1.UserType.student,
                macAddress: macAddress,
                defaultLang: lang_enum_1.Lang.ar,
            }, { expiresIn: '1h' }),
        };
    }
    async changePassword(req, body) {
        let user = await this.userService.findOne(req.user._id);
        if (!user)
            throw new common_1.UnauthorizedException('check your credintials');
        if (override_utils_1.OverrideUtils.dycreptPassword(user.password) !== body.oldPassword)
            throw new common_1.UnauthorizedException('check your credintials');
        user.password = override_utils_1.OverrideUtils.encryptPassword(body.newPassword);
        user.isActive = true;
        user.tempCode = '';
        user = await this.userService.update(user['_id'], user);
        return Object.assign(Object.assign({}, user['_doc']), { token: this.sign(user) });
    }
    async newPassword(req, body) {
        let user = await this.userService.findOne(req.user._id);
        if (!user)
            throw new common_1.UnauthorizedException('check your credintials');
        if (!user.isActive)
            user.password = override_utils_1.OverrideUtils.encryptPassword(body.newPassword);
        user.isActive = true;
        user.tempCode = '';
        user = await this.userService.update(user['_id'], user);
        return Object.assign(Object.assign({}, user['_doc']), { token: this.sign(user) });
    }
    async resetPassword(username) {
        var _a, _b, _c, _d;
        let user;
        user = await this.userService.login(username);
        if (!user)
            throw new common_1.UnauthorizedException('check your credintials');
        user.tempCode = '00000';
        await this.sendOTPSMS(user.phone, user.tempCode);
        user.isActive = false;
        user = await this.userService.update(user['_id'], user);
        (_b = (_a = user.teacher) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? true : delete _b.teacher;
        (_d = (_c = user.student) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? true : delete _d.student;
        return Object.assign(Object.assign({}, user['_doc']), { token: this.sign(user) });
    }
    async refreshToken(refresh) {
        const decodedToken = this.jwtService.decode(refresh.oldtoken);
        if (decodedToken.email == refresh.email &&
            decodedToken.exp <= new Date().getTime()) {
            const user = await this.userService.login(refresh.email, lang_enum_1.Lang.en);
            return Object.assign(Object.assign({}, user['_doc']), { token: this.sign(user) });
        }
        else {
            throw new common_1.UnauthorizedException('Can Not Refresh Token');
        }
    }
    async resendCode(req) {
        let user = await this.userService.findOne(req.user._id);
        if (!user)
            throw new common_1.UnauthorizedException('check your credintials');
        user.tempCode = '54321';
        await this.sendOTPSMS(user.phone, user.tempCode);
        user.isActive = false;
        user = await this.userService.update(user['_id'], user);
        return Object.assign(Object.assign({}, user['_doc']), { token: this.sign(user) });
    }
    async sendOTPSMS(number, tempCode) {
        const msg = `${tempCode} is your verification code for TS-Academy App`;
        const baseURL = `https://apps.gateway.sa/vendorsms/pushsms.aspx?user=${constants_1.sms.user}&password=${constants_1.sms.password}&msisdn=${number}&sid=${constants_1.sms.sid}&fl=${constants_1.sms.fl}&msg=${msg}`;
        await this.httpService.get(baseURL).toPromise();
    }
    async activate(req, code) {
        let user = await this.userService.findOne(req.user._id);
        if (!user)
            throw new common_1.UnauthorizedException('check your credintials');
        if (user.isActive === false && user.tempCode !== code)
            throw new common_1.UnauthorizedException('invalid code');
        user.isActive = true;
        user.tempCode = '';
        user = await this.userService.update(user['_id'], user);
        return Object.assign(Object.assign({}, user['_doc']), { token: this.sign(user) });
    }
    async login(body) {
        let user = await this.userService.login(body.username, body.defaultLang);
        if (!user)
            throw new common_1.UnauthorizedException('user not found');
        if (override_utils_1.OverrideUtils.dycreptPassword(user.password) !== body.password)
            throw new common_1.UnauthorizedException('check your credintials');
        if (user.userType === user_model_1.UserType.parent) {
            if (!body.studentId)
                throw new common_1.UnauthorizedException('please enter student id');
            let student = await this.userService.UserModel.findOne({
                studentId: body.studentId,
            }).exec();
            if (!student)
                throw new common_1.UnauthorizedException('please enter correct student id');
            if (!user.students.find((st) => st === student['_id'])) {
                user.students.push(student);
                await this.userService.UserModel.updateOne({ _id: user['_id'] }, user);
            }
        }
        return Object.assign(Object.assign({}, user['_doc']), { token: this.sign(user) });
    }
    async registerAdmin(body) {
        if (await this.userService.ifUserExists(body.email, body.phone)) {
            throw new common_1.BadRequestException('user already exists');
        }
        let user = new user_model_1.User();
        user.userType = user_model_1.UserType.admin;
        user.name = body.name;
        user.password = override_utils_1.OverrideUtils.encryptPassword(body.password);
        user.email = body.email;
        user.defaultLang = body.defaultLang;
        user.phone = body.phone;
        user.isActive = true;
        let savedUser = await this.userService.save(user).catch((reason) => {
            throw new common_1.BadRequestException('can not create user  ', reason);
        });
        return Object.assign(Object.assign({}, savedUser['_doc']), { token: this.sign(savedUser) });
    }
    async registerTeacher(body) {
        if (await this.userService.ifUserExists(body.email, body.phone)) {
            throw new common_1.BadRequestException('user already exists');
        }
        let user = new user_model_1.User();
        user.userType = user_model_1.UserType.teacher;
        user.name = body.name;
        user.password = override_utils_1.OverrideUtils.encryptPassword(body.password);
        user.email = body.email;
        user.defaultLang = body.defaultLang;
        user.phone = body.phone;
        user.city = new city_model_1.City();
        user.additionalPhone = body.additionalPhone;
        user.city['_id'] = body.cityId;
        user.coverletter = body.coverLetter;
        user.resume = body.resume;
        user.tempCode = '12345';
        await this.sendOTPSMS(user.phone, user.tempCode);
        let savedUser = await this.userService.save(user).catch((reason) => {
            throw new common_1.BadRequestException('can not create user  ', reason);
        });
        return Object.assign(Object.assign({}, savedUser['_doc']), { token: this.sign(savedUser) });
    }
    async registerParent(body) {
        if (await this.userService.ifUserExists(body.email, body.phone)) {
            throw new common_1.BadRequestException('user already exists');
        }
        let savedSudent = await this.userService.UserModel.findOne({
            studentId: body.studentId,
        }).exec();
        if (!savedSudent) {
            throw new common_1.BadRequestException(`can not find student id ${body.studentId}`);
        }
        let user = new user_model_1.User();
        user.userType = user_model_1.UserType.parent;
        user.name = body.name;
        user.password = override_utils_1.OverrideUtils.encryptPassword(body.password);
        user.email = body.email;
        user.defaultLang = body.defaultLang;
        user.phone = body.phone;
        user.students = [savedSudent];
        user.tempCode = '12345';
        await this.sendOTPSMS(user.phone, user.tempCode);
        let savedUser = await this.userService.save(user).catch((reason) => {
            throw new common_1.BadRequestException('can not create user  ', reason);
        });
        return Object.assign(Object.assign({}, savedUser['_doc']), { token: this.sign(savedUser) });
    }
    async registerStudent(body) {
        if (await this.userService.ifUserExists(body.email, body.phone)) {
            throw new common_1.BadRequestException('user already exists');
        }
        let user = new user_model_1.User();
        user.userType = user_model_1.UserType.student;
        user.name = body.name;
        user.password = override_utils_1.OverrideUtils.encryptPassword(body.password);
        user.email = body.email;
        user.defaultLang = body.defaultLang;
        user.phone = body.phone;
        user.city = new city_model_1.City();
        user.grade = new grade_model_1.Grade();
        user.stage = new stage_model_1.Stage();
        user['city']['_id'] = body.cityId;
        user['grade']['_id'] = body.gradeId;
        user['stage']['_id'] = body.stageId;
        user.tempCode = '12345';
        await this.sendOTPSMS(user.phone, user.tempCode);
        let savedUser = await this.userService.save(user);
        return Object.assign(Object.assign({}, savedUser['_doc']), { token: this.sign(savedUser) });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        axios_1.HttpService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map