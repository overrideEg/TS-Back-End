import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseContent, CourseDocument, LessonType } from '../../Models/course.model';
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
    async update(req: any, id: string, body: Course): Promise<Course | PromiseLike<Course>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can update courses');
        }
        let teacher = await this.userService.findOne(req.user.id);
        if (teacher['_id'].toString() !== req.user.id) {
            throw new BadRequestException('only teacher can update his courses');
        }
        //TODO:
        await this.CourseModel.findByIdAndUpdate(id, body).exec();
        return await this.CourseModel.findById(id).exec();
    }

    async delete(req: any, id: string): Promise<Course | PromiseLike<Course>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can update courses');
        }
        let teacher = await this.userService.findOne(req.user.id);
        if (teacher['_id'].toString() !== req.user.id) {
            throw new BadRequestException('only teacher can update his courses');
        }
        let course = await this.CourseModel.findById(id).exec();
        if (course.startDate < Date.now()) {
            throw new BadRequestException('you can not delete started course');
        }

        return await this.CourseModel.findByIdAndDelete(id);
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
        course.content = contents;
        await course.updateOne({ _id: course['_id'] }).exec();
        return course.content;
    }




    async getTeacherCourses(req: any): Promise<Course[] | PromiseLike<Course[]>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can view this request');
        }
        let teacher = (await this.userService.findOne(req.user.id)).teacher;
        let courses = await this.CourseModel.find({ teacher: teacher['_id'] })
            .exec() as any
        courses.forEach((course) => {
            course = course.toObject();
            course['cRating'] = 10 - Math.random() * 10;
            course['progress'] = 100 - Math.random() * 100
        })
        return courses;
    }

}