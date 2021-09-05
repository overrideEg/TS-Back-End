import { Injectable } from '@nestjs/common';
import { GlobalFilter, GlobalSearch } from '../../dtos/search.dto';
import { TeacherProfile } from '../../dtos/teacher-profile.dto';
import { Sort } from '../../enums/sort.enum';
import { Course } from '../../Models/course.model';
import { UserType } from '../../Models/user.model';
import { CheckoutService } from '../checkout/checkout.service';
import { CourseService } from '../course/course.service';
import { UserService } from '../user/user.service';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class SearchService {

    constructor(
        private courseService: CourseService,
        private checkoutService: CheckoutService,
        private userService: UserService
    ) { }


    async globalSearch(req: any, search: string, page: number, limit: number): Promise<GlobalSearch | PromiseLike<GlobalSearch>> {
        let globalSearch = new GlobalSearch()
        let courses = await this.courseService.CourseModel.find(
            {
                // $and: [
                //     // { $text: { $search: search } },
                //     {
                        $or: [

                            { "name.en": { $regex: '^' + search, $options: 'i' } },
                            { "name.ar": { $regex: '^' + search, $options: 'i' } },
                            { "info.en": { $regex: '^' + search, $options: 'i' } },
                            { "info.ar": { $regex: '^' + search, $options: 'i' } },
                            { "description.en": { $regex: '^' + search, $options: 'i' } },
                            { "description.ar": { $regex: '^' + search, $options: 'i' } },
                            { 'content.chapter': { $regex: '^' + search, $options: 'i' } },
                            { 'content.chapter.lessons.name': { $regex: '^' + search, $options: 'i' } }
                        ]
                //     }
                // ]

            }
        ).sort({
            priority: 'asc'
        }).populate('teacher')
            .limit(limit)
            .skip(limit * page)
            .exec();

        for await (const course of courses) {
            course.inCart = await this.userService.UserModel.exists({ _id: new ObjectId(req.user.id), cart: new ObjectId(course['_id']) })
            course.related = [];

        }
        globalSearch.courses = courses;
        let userTeachers = await this.userService.UserModel.find(
            {
                $and: [
                    {
                        $or: [
                            { "name": { $regex: '^' + search, $options: 'i' }, }
                        ],
                    },

                    { userType: UserType.teacher }
                ]


            }
        ).sort({
            priority: 'asc'
        })
            .limit(limit)
            .skip(limit * page)
            .exec();

        globalSearch.teachers = []
        for await (const user of userTeachers) {

            let profile = new TeacherProfile();
            profile.name = user.name;
            profile.avatar = user.avatar ?? "";
            let teacherCourses = await this.courseService.CourseModel.find({ teacher: user });
            let registers = await this.checkoutService.CheckoutModel.countDocuments().populate({
                "path": "lines.course",
                'model': Course.name
            }).populate({
                path: 'lines.course.teacher',
                "match": new ObjectId(user['_id'].toString())
            });
            profile.noOfStudents = registers
            profile.noOfCourses = teacherCourses.length
            profile.rate = teacherCourses.length > 0 ? teacherCourses.reduce((acc, course) => acc + course.cRating, 0) / teacherCourses?.length : 5;
            profile.bio = user?.bio ?? user.name;
            profile.userId = user['_id']
            profile.teacherId = user['_id']
            globalSearch.teachers.push(profile);
        }
        return globalSearch;
    }

    async filter(req: any, subjectId: string, gradeId: string, stageId: string, cityId: string, rate: Sort, page: number, limit: number): Promise<GlobalFilter | PromiseLike<GlobalFilter>> {
        let globalFilter = new GlobalFilter();

        let featuresCourses = await this.courseService.CourseModel.find({
            $and: [
                subjectId ? { subject: new ObjectId(subjectId) } : {}
            ]
        }).sort({ 'cRating': 'desc' }).exec();


        for await (const course of featuresCourses) {
            course.inCart = await this.userService.UserModel.exists({ _id: new ObjectId(req.user.id), cart: new ObjectId(course['_id'].toString()) })
        }
        globalFilter.topInstructors = []

        for await (const course of featuresCourses) {

            let profile = new TeacherProfile();
            profile.name = course.teacher.name;
            profile.avatar = course.teacher.avatar ?? "";
            let teacherCourses = await this.courseService.CourseModel.find({ teacher: course.teacher });
            profile.noOfStudents = await this.checkoutService.CheckoutModel.countDocuments().populate({
                "path": "course",
                'model': Course.name
            }).populate({
                path: 'course.teacher._id',
                "match": new ObjectId(course.teacher['_id'])
            });
            profile.noOfCourses = teacherCourses.length
            profile.rate = teacherCourses.length > 0 ? teacherCourses.reduce((acc, course) => acc + course.cRating, 0) / teacherCourses?.length : 5;
            profile.bio = course.teacher?.bio ?? course.teacher.name;
            profile.userId = course.teacher['_id']
            globalFilter.topInstructors.push(profile);
        }

        globalFilter.featuresCourses = featuresCourses.slice(0, 10);

        let allCourses = await this.courseService.CourseModel.find({

            $and: [
                subjectId ? { subject: new ObjectId(subjectId) } : {},
                gradeId ? { grade: new ObjectId(gradeId) } : {},
                stageId ? { grade: new ObjectId(stageId) } : {},
            ]
        }).sort({ 'cRating': rate === Sort.HTL ? 'desc' : 'asc' }).limit(limit)
            .skip(limit * page).exec();

        for await (const course of allCourses) {
            course.inCart = await this.userService.UserModel.exists({ _id: new ObjectId(req.user.id), cart: new ObjectId(course['_id'].toString()) })

        }
        if (cityId) {
            allCourses = allCourses.filter(course => course?.teacher?.city['_id'] === cityId);
        }
        globalFilter.allCourses = allCourses;
        return globalFilter;

    }

}
