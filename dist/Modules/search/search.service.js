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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const search_dto_1 = require("../../dtos/search.dto");
const teacher_profile_dto_1 = require("../../dtos/teacher-profile.dto");
const sort_enum_1 = require("../../enums/sort.enum");
const course_model_1 = require("../../models/course/course.model");
const checkout_service_1 = require("../checkout/checkout.service");
const course_service_1 = require("../course/course.service");
const user_service_1 = require("../user/user.service");
const ObjectId = require('mongoose').Types.ObjectId;
let SearchService = class SearchService {
    constructor(courseService, checkoutService, userService) {
        this.courseService = courseService;
        this.checkoutService = checkoutService;
        this.userService = userService;
    }
    async globalSearch(req, search, page, limit) {
        let globalSearch = new search_dto_1.GlobalSearch();
        let courses = await this.courseService.CourseModel.find({
            $or: [
                { 'name.ar': new RegExp(search, 'i') },
                { 'name.en': new RegExp(search, 'i') },
                { 'info.ar': new RegExp(search, 'i') },
                { 'info.en': new RegExp(search, 'i') },
                { 'description.ar': new RegExp(search, 'i') },
                { 'description.en': new RegExp(search, 'i') },
                { 'content.chapter': new RegExp(search, 'i') },
                { 'content.chapter.lessons.name': new RegExp(search, 'i') },
            ],
        })
            .sort({
            priority: 'asc',
        })
            .populate('teacher')
            .limit(limit)
            .skip(limit * page)
            .exec();
        globalSearch.teachers = [];
        return globalSearch;
    }
    async filter(req, subjectId, gradeId, stageId, cityId, rate, page, limit) {
        var e_1, _a;
        var _b, _c, _d;
        let globalFilter = new search_dto_1.GlobalFilter();
        let featuresCourses = await this.courseService.CourseModel.find({
            $and: [
                subjectId ? { subject: new ObjectId(subjectId) } : {},
                gradeId ? { grade: new ObjectId(gradeId) } : {},
                stageId ? { stage: new ObjectId(stageId) } : {},
            ],
        })
            .sort({ cRating: 'desc' })
            .exec();
        globalFilter.topInstructors = [];
        try {
            for (var featuresCourses_1 = __asyncValues(featuresCourses), featuresCourses_1_1; featuresCourses_1_1 = await featuresCourses_1.next(), !featuresCourses_1_1.done;) {
                const course = featuresCourses_1_1.value;
                let profile = new teacher_profile_dto_1.TeacherProfile();
                profile.name = course.teacher.name;
                profile.avatar = (_b = course.teacher.avatar) !== null && _b !== void 0 ? _b : '';
                let teacherCourses = await this.courseService.CourseModel.find({
                    teacher: course.teacher,
                });
                profile.noOfStudents =
                    await this.checkoutService.CheckoutModel.countDocuments()
                        .populate({
                        path: 'course',
                        model: course_model_1.Course.name,
                    })
                        .populate({
                        path: 'course.teacher._id',
                        match: new ObjectId(course.teacher['_id']),
                    });
                profile.noOfCourses = teacherCourses.length;
                profile.bio = (_d = (_c = course.teacher) === null || _c === void 0 ? void 0 : _c.bio) !== null && _d !== void 0 ? _d : course.teacher.name;
                profile.userId = course.teacher['_id'];
                if (!cityId)
                    globalFilter.topInstructors.push(profile);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (featuresCourses_1_1 && !featuresCourses_1_1.done && (_a = featuresCourses_1.return)) await _a.call(featuresCourses_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        globalFilter.featuresCourses = featuresCourses.slice(0, 10);
        let allCourses = await this.courseService.CourseModel.find({
            $and: [
                subjectId ? { subject: new ObjectId(subjectId) } : {},
                gradeId ? { grade: new ObjectId(gradeId) } : {},
                stageId ? { stage: new ObjectId(stageId) } : {},
            ],
        })
            .sort({ cRating: rate === sort_enum_1.Sort.HTL ? 'desc' : 'asc' })
            .limit(limit)
            .skip(limit * page)
            .exec();
        if (cityId) {
            allCourses = allCourses.filter((course) => { var _a; return ((_a = course === null || course === void 0 ? void 0 : course.teacher) === null || _a === void 0 ? void 0 : _a.city['_id']) === cityId; });
            featuresCourses = featuresCourses.filter((course) => { var _a; return ((_a = course === null || course === void 0 ? void 0 : course.teacher) === null || _a === void 0 ? void 0 : _a.city['_id']) === cityId; });
        }
        globalFilter.allCourses = allCourses;
        globalFilter.featuresCourses = featuresCourses;
        return globalFilter;
    }
};
SearchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [course_service_1.CourseService,
        checkout_service_1.CheckoutService,
        user_service_1.UserService])
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map