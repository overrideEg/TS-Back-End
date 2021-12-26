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
exports.SearchController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sort_enum_1 = require("../../enums/sort.enum");
const jwt_auth_guard_1 = require("../auth/security/jwt-auth.guard");
const search_service_1 = require("./search.service");
let SearchController = class SearchController {
    constructor(searchService) {
        this.searchService = searchService;
    }
    async global(req, search, page, limit) {
        var _a, _b;
        return this.searchService.globalSearch(req, search, ((_a = +page) !== null && _a !== void 0 ? _a : 1) - 1, (_b = +limit) !== null && _b !== void 0 ? _b : 15);
    }
    async filter(req, subjectId, page, limit, gradeId, stageId, cityId, rate) {
        var _a, _b;
        return this.searchService.filter(req, subjectId, gradeId, stageId, cityId, rate, ((_a = +page) !== null && _a !== void 0 ? _a : 1) - 1, (_b = +limit) !== null && _b !== void 0 ? _b : 15);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "global", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('filter'),
    (0, swagger_1.ApiQuery)({
        name: 'rate',
        description: 'rate sorting',
        enum: [sort_enum_1.Sort.HTL, sort_enum_1.Sort.LTH],
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', description: 'page', required: true }),
    (0, swagger_1.ApiQuery)({ name: 'limit', description: 'number of pages', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'gradeId', description: 'gradeId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'stageId', description: 'stageId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'cityId', description: 'cityId', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'subjectId', description: 'subjectId', required: true }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)('subjectId')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('gradeId')),
    __param(5, (0, common_1.Query)('stageId')),
    __param(6, (0, common_1.Query)('cityId')),
    __param(7, (0, common_1.Query)('rate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number, Number, String, String, String, String]),
    __metadata("design:returntype", Promise)
], SearchController.prototype, "filter", null);
SearchController = __decorate([
    (0, swagger_1.ApiTags)('Search'),
    (0, common_1.Controller)('Search'),
    __metadata("design:paramtypes", [search_service_1.SearchService])
], SearchController);
exports.SearchController = SearchController;
//# sourceMappingURL=search.controller.js.map