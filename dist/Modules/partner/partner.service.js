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
var PartnerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const partner_model_1 = require("../../models/partner.model");
let PartnerService = PartnerService_1 = class PartnerService {
    constructor(PartnerModel) {
        this.PartnerModel = PartnerModel;
        this.log = new common_1.Logger(PartnerService_1.name);
    }
    async save(req) {
        let saved = await this.PartnerModel.create(req);
        return saved;
    }
    async findAll() {
        return this.PartnerModel.find().exec();
    }
    async findOne(id) {
        return this.PartnerModel.findById(id).exec();
    }
    async update(id, req) {
        await this.PartnerModel.findByIdAndUpdate(id, req);
        return this.findOne(id);
    }
    async remove(id) {
        return await this.PartnerModel.remove({ _id: id });
    }
};
PartnerService = PartnerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(partner_model_1.Partner.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PartnerService);
exports.PartnerService = PartnerService;
//# sourceMappingURL=partner.service.js.map