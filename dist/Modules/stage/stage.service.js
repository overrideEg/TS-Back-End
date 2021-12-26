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
exports.StageService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const stage_model_1 = require("../../models/stage.model");
let StageService = class StageService {
    constructor(StageModel) {
        this.StageModel = StageModel;
    }
    async save(req) {
        let saved = await await this.StageModel.create(req);
        return saved;
    }
    async findAll() {
        return this.StageModel.find().exec();
    }
    async findOne(id) {
        return this.StageModel.findById(id).exec();
    }
    async update(id, req) {
        await this.StageModel.findByIdAndUpdate(id, req);
        return this.findOne(id);
    }
    async remove(id) {
        return await this.StageModel.findByIdAndRemove(id);
    }
};
StageService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(stage_model_1.Stage.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], StageService);
exports.StageService = StageService;
//# sourceMappingURL=stage.service.js.map