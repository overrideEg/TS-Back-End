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
exports.ExcerciceSchema = exports.Excercice = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const base_entity_1 = require("../../../shared/base-entity");
const user_model_1 = require("../../user.model");
const swagger_1 = require("@nestjs/swagger");
let Excercice = class Excercice extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_model_1.User, readOnly: true }),
    (0, mongoose_1.Prop)({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: true,
    }),
    __metadata("design:type", user_model_1.User)
], Excercice.prototype, "user", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'link', required: true }),
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Excercice.prototype, "link", void 0);
Excercice = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        skipVersioning: true,
    })
], Excercice);
exports.Excercice = Excercice;
exports.ExcerciceSchema = mongoose_1.SchemaFactory.createForClass(Excercice);
//# sourceMappingURL=excercice.model.js.map