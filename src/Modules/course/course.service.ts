import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseContent, CourseDocument } from '../../Models/course.model';
import { UserType } from '../../Models/user.model';
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


    async addCourseContent(req: any, courseId: string, body: CourseContent): Promise<Course | PromiseLike<Course>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can add courses');
        }
        let teacher = (await this.userService.findOne(req.user.id)).teacher;
        let course = await this.CourseModel.findById(courseId).populate('teacher').populate('stage').populate('grade').exec()
        if (course.teacher['_id'] !== teacher['_id'])
            throw new BadRequestException('only teacher can add his content');
        course.content != null ? course.content.push(body) : course.content = [body];
        course.updateOne(course).exec();
        return course;
    }

}