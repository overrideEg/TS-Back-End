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
exports.UserController = void 0;
const status_enum_1 = require("./../../enums/status.enum");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const update_profile_dto_1 = require("../../dtos/update-profile.dto");
const wallet_enum_1 = require("../../enums/wallet.enum");
const bank_account_model_1 = require("../../models/bank-account.model");
const student_review_model_1 = require("../../models/student-review.model");
const user_model_1 = require("../../models/user.model");
const jwt_auth_guard_1 = require("../auth/security/jwt-auth.guard");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(service) {
        this.service = service;
    }
    async saveUser(req) {
        return this.service.save(req);
    }
    getAllUsers(userType) {
        return this.service.findAll(userType);
    }
    getMyProfile(req) {
        return this.service.myProfile(req);
    }
    getTeacherProfile(id) {
        return this.service.getTeacherProfile(id);
    }
    getBankAccounts(req) {
        return this.service.getBankAccounts(req);
    }
    getWallets(type, status) {
        return this.service.getWallets(type ? wallet_enum_1.TransactionType[type] : null, status ? status_enum_1.Status[status] : null);
    }
    ReviewStudent(req, studentId, courseId, body) {
        return this.service.reviewStudent(req, studentId, courseId, body);
    }
    studentReview(req, studentId, subjectId) {
        return this.service.getStudentReviews(req, studentId, subjectId);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    approveTeacher(id) {
        return this.service.teacherStatus(id);
    }
    updateUser(id, req) {
        return this.service.update(id, req);
    }
    updateProfile(req, profile) {
        return this.service.updateProfile(req, profile);
    }
    deleteUser(id) {
        return this.service.remove(id);
    }
    addBankAcount(req, body) {
        return this.service.addBankAccount(req, body);
    }
    withdrawCash(req, accountId, amount) {
        return this.service.withDrawCash(req, accountId, +amount);
    }
    approveTransaction(teacherId, walletId) {
        return this.service.approveTransaction(teacherId, walletId);
    }
    deleteBankAcount(req, accountId) {
        return this.service.deleteBankAccount(req, accountId);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_model_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "saveUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/all'),
    (0, swagger_1.ApiQuery)({
        name: 'userType',
        enum: [user_model_1.UserType.admin, user_model_1.UserType.parent, user_model_1.UserType.student, user_model_1.UserType.teacher],
        required: false,
    }),
    __param(0, (0, common_1.Query)('userType')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/profile'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMyProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('teacher/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getTeacherProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('account'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getBankAccounts", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('wallet'),
    (0, swagger_1.ApiQuery)({ name: 'type', enum: [wallet_enum_1.TransactionType.in, wallet_enum_1.TransactionType.out] }),
    (0, swagger_1.ApiQuery)({ name: 'status', enum: [status_enum_1.Status.approved, status_enum_1.Status.pending] }),
    __param(0, (0, common_1.Query)('type')),
    __param(1, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getWallets", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('reviewStudent/:studentId/:courseId'),
    (0, swagger_1.ApiBody)({ type: () => student_review_model_1.StudentReview }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('studentId')),
    __param(2, (0, common_1.Param)('courseId')),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, student_review_model_1.StudentReview]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "ReviewStudent", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('review/:studentId/:subjectId'),
    (0, swagger_1.ApiBody)({ type: () => student_review_model_1.StudentReview }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('studentId')),
    __param(2, (0, common_1.Param)('subjectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "studentReview", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('teacherStatus/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "approveTeacher", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_model_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('/profile'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateProfile]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('account'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, bank_account_model_1.BankAccount]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "addBankAcount", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('Withdraw/:accountId/:amount'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('accountId')),
    __param(2, (0, common_1.Param)('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "withdrawCash", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('wallet/approve/:teacherId/:walletId'),
    __param(0, (0, common_1.Param)('teacherId')),
    __param(1, (0, common_1.Param)('walletId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "approveTransaction", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)('account/:accountId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('accountId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteBankAcount", null);
UserController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('User'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map