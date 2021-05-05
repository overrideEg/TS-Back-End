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


    async addCourseContent(req: any, courseId: string, body: CourseContent): Promise<CourseContent[] | PromiseLike<CourseContent[]>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can add courses');
        }
        let teacher = (await this.userService.findOne(req.user.id)).teacher;
        let course = await this.CourseModel.findById(courseId).exec()
        if (course.teacher['_id'].toString() !== teacher['_id'].toString())
            throw new BadRequestException('only teacher can add his content');
        body['OId'] = OverrideUtils.generateGUID()
        body.lessons.forEach(lesson => lesson['OId'] = OverrideUtils.generateGUID());
        course.content != null ? course.content.push(body) : course.content = [body];

        course.updateOne(course).exec();
        return course.content;
    }


    async updateCourseContent(req: any, courseId: string, contentId: string, body: CourseContent): Promise<CourseContent[] | PromiseLike<CourseContent[]>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can add courses');
        }
        let teacher = (await this.userService.findOne(req.user.id)).teacher;
        let course = await this.CourseModel.findById(courseId).exec()
        if (course.teacher['_id'].toString() !== teacher['_id'].toString())
            throw new BadRequestException('only teacher can add his content');
        let content = course.content.find(cont => cont.OId === contentId);
        if (!content)
            throw new BadRequestException('no content was found with provided id');
        content.OId = contentId
        content.chapter = body.chapter;
        content.lessons = body.lessons;
        course.updateOne(course).exec();
        return course.content;
    }


    async deleteCourseContent(req: any, courseId: string, contentId: string): Promise<CourseContent[] | PromiseLike<CourseContent[]>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can add courses');
        }
        let teacher = (await this.userService.findOne(req.user.id)).teacher;
        let course = await this.CourseModel.findById(courseId).exec()
        if (course.teacher['_id'].toString() !== teacher['_id'].toString())
            throw new BadRequestException('only teacher can add his content');
        let content = course.content.find(cont => cont.OId === contentId);
        if (!content)
            throw new BadRequestException('no content was found with provided id');
        course.content.splice(course.content.findIndex(cont => cont.OId === contentId), 1);
        course.updateOne(course).exec();
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