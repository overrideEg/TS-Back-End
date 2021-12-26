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
exports.GradeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const grade_model_1 = require("../../models/grade.model");
const jwt_auth_guard_1 = require("../auth/security/jwt-auth.guard");
const grade_service_1 = require("./grade.service");
let GradeController = class GradeController {
    constructor(service) {
        this.service = service;
    }
    async saveGrade(req) {
        return this.service.save(req);
    }
    getAllGrades() {
        return this.service.findAll();
    }
    getAllGradesByStageId(stageId) {
        return this.service.findAllGradesByStageId(stageId);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    updateGrade(id, req) {
        return this.service.update(id, req);
    }
    deleteGrade(id) {
        return this.service.remove(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [grade_model_1.Grade]),
    __metadata("design:returntype", Promise)
], GradeController.prototype, "saveGrade", null);
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GradeController.prototype, "getAllGrades", null);
__decorate([
    (0, common_1.Get)('/stage/:stageId'),
    __param(0, (0, common_1.Param)('stageId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GradeController.prototype, "getAllGradesByStageId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GradeController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, grade_model_1.Grade]),
    __metadata("design:returntype", Promise)
], GradeController.prototype, "updateGrade", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GradeController.prototype, "deleteGrade", null);
GradeController = __decorate([
    (0, swagger_1.ApiTags)('Grade'),
    (0, common_1.Controller)('Grade'),
    __metadata("design:paramtypes", [grade_service_1.GradeService])
], GradeController);
exports.GradeController = GradeController;
//# sourceMappingURL=grade.controller.js.map