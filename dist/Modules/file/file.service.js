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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongodb_1 = require("mongodb");
let FileService = class FileService {
    constructor(OFileModel, connection) {
        this.OFileModel = OFileModel;
        this.connection = connection;
        this.bucket = new mongoose_2.mongo.GridFSBucket(this.connection.db);
    }
    async upload({ request, file }) {
        const fullUrl = 'http://' + request.hostname + '/v1';
        return new Promise(async (resolve, reject) => {
            try {
                request.multipart((field, file, filename, encoding, mimetype) => {
                    const uploadStream = this.bucket.openUploadStream('/' + filename, {
                        contentType: mimetype,
                    });
                    file.on('end', () => {
                        var _a, _b;
                        resolve({
                            id: (_a = uploadStream.id) === null || _a === void 0 ? void 0 : _a.toString(),
                            path: fullUrl + '/File/' + ((_b = uploadStream.id) === null || _b === void 0 ? void 0 : _b.toString()),
                            name: filename,
                            mimetype: mimetype,
                        });
                    });
                    file.pipe(uploadStream);
                }, (err) => {
                    reject(new common_1.BadRequestException('error while uploading'));
                });
            }
            catch (e) {
                reject(new common_1.BadRequestException('error while uploading'));
            }
        });
    }
    async uploadMultiple({ request, file }) {
        const fullUrl = 'http://' + request.hostname;
        return new Promise(async (resolve, reject) => {
            var e_1, _a;
            try {
                const parts = await request.parts();
                const files = [];
                try {
                    for (var parts_1 = __asyncValues(parts), parts_1_1; parts_1_1 = await parts_1.next(), !parts_1_1.done;) {
                        const part = parts_1_1.value;
                        if (part.file) {
                            const uploadStream = this.bucket.openUploadStream('/' + part.filename, {
                                contentType: part.mimetype,
                            });
                            part.file.on('end', () => {
                                var _a, _b;
                                files.push({
                                    id: (_a = uploadStream.id) === null || _a === void 0 ? void 0 : _a.toString(),
                                    path: fullUrl + '/File/' + ((_b = uploadStream.id) === null || _b === void 0 ? void 0 : _b.toString()),
                                    name: part.filename,
                                    mimetype: part.mimetype,
                                });
                            });
                            part.file.pipe(uploadStream);
                        }
                        else {
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (parts_1_1 && !parts_1_1.done && (_a = parts_1.return)) await _a.call(parts_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                resolve(files);
            }
            catch (e) {
                reject(new common_1.ServiceUnavailableException());
            }
        });
    }
    async download(id, request, response) {
        var _a, _b, _c, _d, _e;
        if (!mongodb_1.ObjectId.isValid(id)) {
            throw new common_1.BadRequestException('Invalid File ID');
        }
        const oId = new mongodb_1.ObjectId(id);
        const fileInfo = await this.OFileModel.findOne({ _id: id }).exec();
        if (!fileInfo) {
            throw new common_1.NotFoundException('File Not Found');
        }
        if (request.headers.range) {
            const range = (_c = (_b = (_a = request === null || request === void 0 ? void 0 : request.headers) === null || _a === void 0 ? void 0 : _a.range) === null || _b === void 0 ? void 0 : _b.substr(6)) === null || _c === void 0 ? void 0 : _c.split('-');
            const start = parseInt(range[0], 10);
            const end = parseInt(range[1], 10) || null;
            const readstream = (_d = this.bucket) === null || _d === void 0 ? void 0 : _d.openDownloadStream(oId, {
                start,
                end,
            });
            response.status(206);
            response.headers({
                'Accept-Ranges': 'bytes',
                'Content-Type': fileInfo === null || fileInfo === void 0 ? void 0 : fileInfo.contentType,
                'Content-Range': `bytes ${start}-${end ? end : (fileInfo === null || fileInfo === void 0 ? void 0 : fileInfo.length) - 1}/${fileInfo === null || fileInfo === void 0 ? void 0 : fileInfo.length}`,
                'Content-Length': (end ? end : fileInfo === null || fileInfo === void 0 ? void 0 : fileInfo.length) - start,
            });
            (_e = response === null || response === void 0 ? void 0 : response.raw) === null || _e === void 0 ? void 0 : _e.on('close', () => {
                readstream.destroy();
            });
            response.send(readstream);
        }
        else {
            const readstream = this.bucket.openDownloadStream(oId);
            response.raw.on('close', () => {
                readstream.destroy();
            });
            response.status(200);
            response.headers({
                'Accept-Range': 'bytes',
                'Content-Type': fileInfo.contentType,
                'Content-Length': fileInfo.length,
                'Content-Disposition': `attachment; filename="${fileInfo.filename}"`,
            });
            response.send(readstream);
        }
    }
};
FileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('fs.files')),
    __param(1, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Connection])
], FileService);
exports.FileService = FileService;
//# sourceMappingURL=file.service.js.map