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
exports.GradeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const grade_model_1 = require("../../models/grade.model");
const ObjectId = require('mongoose').Types.ObjectId;
let GradeService = class GradeService {
    constructor(GradeModel) {
        this.GradeModel = GradeModel;
    }
    async save(req) {
        let saved = await await this.GradeModel.create(req);
        return saved;
    }
    async findAll() {
        return this.GradeModel.find().exec();
    }
    findAllGradesByStageId(stageId) {
        return this.GradeModel.find({ stage: new ObjectId(stageId) }).exec();
    }
    async findOne(id) {
        return this.GradeModel.findById(id).exec();
    }
    async update(id, req) {
        await this.GradeModel.findByIdAndUpdate(id, req);
        return this.findOne(id);
    }
    async remove(id) {
        return await this.GradeModel.findByIdAndRemove(id);
    }
};
GradeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(grade_model_1.Grade.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GradeService);
exports.GradeService = GradeService;
//# sourceMappingURL=grade.service.js.map