import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseContent, CourseDocument } from '../../Models/course.model';
import { UserType } from '../../Models/user.model';
import { OverrideUtils } from '../../shared/override-utils';
import { TeacherService } from '../teacher/teacher.service';
import { UserService } from '../user/user.service';
@Injectable()
export class CourseService {




    constructor(
        @InjectModel(Course.name) private CourseModel: Model<CourseDocument>,
        private userService: UserService
    ) { }


    async newCourse(req: any, body: Course): Promise<Course | PromiseLike<Course>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can add courses');
        }
        let teacher = (await this.userService.findOne(req.user.id)).teacher;
        body['teacher'] = teacher;
        body['createdAt'] = Date.now()

        return this.CourseModel.create(body)
    }


    async addCourseContent(req: any, courseId: string, contents: CourseContent[]): Promise<CourseContent[] | PromiseLike<CourseContent[]>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can add courses');
        }
        let teacher = (await this.userService.findOne(req.user.id)).teacher;
        let course = await this.CourseModel.findById(courseId).exec()
        if (course.teacher['_id'].toString() !== teacher['_id'].toString())
            throw new BadRequestException('only teacher can add his content');
        contents.forEach(content => {
            content.OId = OverrideUtils.generateGUID();
            content.lessons.forEach(lesson => lesson['OId'] = OverrideUtils.generateGUID());
        })
        await course.updateOne(course, { useFindAndModify: false }).exec();
        return course.content;
    }


   

    async getTeacherCourses(req: any): Promise<Course[] | PromiseLike<Course[]>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can view this request');
        }
        let teacher = (await this.userService.findOne(req.user.id)).teacher;
        let courses = await this.CourseModel.find({ teacher: teacher['_id'] })
            .lean()
            .exec()
        courses.forEach(course => {

            course.cRating = 10 - Math.random() * 10
            course.progress = 100 - Math.random() * 100
        })
        return courses;
    }

}