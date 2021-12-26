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
exports.CityService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const city_model_1 = require("../../models/city.model");
let CityService = class CityService {
    constructor(CityModel) {
        this.CityModel = CityModel;
    }
    async save(req) {
        let saved = await this.CityModel.create(req);
        return saved;
    }
    async findAll() {
        return this.CityModel.find().exec();
    }
    async findOne(id) {
        return this.CityModel.findById(id).exec();
    }
    async update(id, req) {
        return await this.CityModel.findByIdAndUpdate(id, req);
    }
    async remove(id) {
        return await this.CityModel.findByIdAndRemove(id);
    }
};
CityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(city_model_1.City.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CityService);
exports.CityService = CityService;
//# sourceMappingURL=city.service.js.map