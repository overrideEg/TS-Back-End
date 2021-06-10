import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GlobalFilter, GlobalSearch } from '../../dtos/search.dto';
import { TeacherProfile } from '../../dtos/teacher-profile.dto';
import { Sort } from '../../enums/sort.enum';
import { Course, CourseDocument } from '../../Models/course.model';
import { Teacher, TeacherDocument } from '../../Models/teacher.model';
import { UserType } from '../../Models/user.model';
import { UserService } from '../user/user.service';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class SearchService {

    constructor(
        @InjectModel(Course.name) private CourseModel: Model<CourseDocument>,
        @InjectModel(Teacher.name) private TeacherModel: Model<TeacherDocument>,
        private userService: UserService
    ) { }


    async globalSearch(req: any, search: string, page: number, limit: number): Promise<GlobalSearch | PromiseLike<GlobalSearch>> {
        let globalSearch = new GlobalSearch()
        let courses = await this.CourseModel.find(
            {
                $or: [
                    { "name": { $regex: '^' + search, $options: 'i' } },
                    { "info": { $regex: '^' + search, $options: 'i' } },
                    { "description": { $regex: '^' + search, $options: 'i' } },
                    { 'content.chapter': { $regex: '^' + search, $options: 'i' } },
                    { 'content.chapter.lessons.name': { $regex: '^' + search, $options: 'i' } }
                ]

            }
        ).sort({
            priority: 'asc'
        }).populate('teacher')
            .limit(limit)
            .skip(limit * page)
            .exec();

        for await (const course of courses) {
            course.teacher.user = await this.userService.findByTeacher(course?.teacher['_id'])
            course.inCart = await this.userService.UserModel.exists({ _id: new ObjectId(req.user.id), cart: new ObjectId(course['_id']) })
            course.related = [];
       
        }
        globalSearch.courses = courses;
        let userTeachers = await this.userService.UserModel.find(
            {

                "name": { $regex: '^' + search, $options: 'i' },
                userType: UserType.teacher


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
            let teacherCourses = await this.CourseModel.find({ teacher: user.teacher });
            profile.noOfStudents = +((Math.random() * 100).toFixed(0));
            profile.noOfCourses = teacherCourses.length
            profile.rate = teacherCourses.length > 0 ? teacherCourses.reduce((acc, course) => acc + course.cRating, 0) / teacherCourses?.length : 5;
            profile.bio = user.teacher?.bio ?? user.name;
            profile.userId = user['_id']
            globalSearch.teachers.push(profile);
        }
        return globalSearch;
    }

    async filter(req: any, subjectId: string, gradeId: string, stageId: string, cityId: string, rate: Sort, page: number, limit: number): Promise<GlobalFilter | PromiseLike<GlobalFilter>> {
        let globalFilter = new GlobalFilter();

        let topCourses = await this.CourseModel.find({
            subject: new ObjectId(subjectId)

        })


        return globalFilter;

    }

}
