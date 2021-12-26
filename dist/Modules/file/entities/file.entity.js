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
exports.OFileSchema = exports.OFile = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const base_entity_1 = require("../../../shared/base-entity");
let OFile = class OFile extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OFile.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], OFile.prototype, "length", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], OFile.prototype, "chunkSize", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OFile.prototype, "uploadDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OFile.prototype, "filename", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OFile.prototype, "md5", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], OFile.prototype, "contentType", void 0);
OFile = __decorate([
    (0, mongoose_1.Schema)()
], OFile);
exports.OFile = OFile;
exports.OFileSchema = mongoose_1.SchemaFactory.createForClass(OFile);
//# sourceMappingURL=file.entity.js.map