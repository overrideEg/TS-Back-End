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
exports.CitySchema = exports.City = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const localized_1 = require("../shared/localized");
const location_model_1 = require("../shared/location.model");
const base_entity_1 = require("../shared/base-entity");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let City = class City extends base_entity_1.OBaseEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => localized_1.Localized }),
    (0, mongoose_1.Prop)({ type: () => localized_1.Localized }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => localized_1.Localized),
    __metadata("design:type", localized_1.Localized)
], City.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => location_model_1.LocationModel }),
    (0, mongoose_1.Prop)({ type: () => location_model_1.LocationModel }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => location_model_1.LocationModel),
    __metadata("design:type", location_model_1.LocationModel)
], City.prototype, "loc", void 0);
City = __decorate([
    (0, mongoose_1.Schema)()
], City);
exports.City = City;
exports.CitySchema = mongoose_1.SchemaFactory.createForClass(City);
exports.CitySchema.index({ loc: '2dsphere' });
//# sourceMappingURL=city.model.js.map