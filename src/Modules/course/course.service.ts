import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { RtcRole, RtcTokenBuilder } from 'agora-access-token';
import { Model } from 'mongoose';
import { Course, CourseContent, CourseDocument, CourseReview, LessonType } from '../../Models/course.model';
import { UserType } from '../../Models/user.model';
import { OverrideUtils } from '../../shared/override-utils';
import { Agora } from '../auth/Security/constants';
import { TeacherService } from '../teacher/teacher.service';
import { UserService } from '../user/user.service';
const ObjectId = require('mongoose').Types.ObjectId;

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

    async startLive(req, courseId, lessonId) {
        let course = await this.CourseModel.findById(courseId).lean().exec();
        let content = course.content.find(content => content.lessons.find(less => less.OId === lessonId));
        let lesson = content.lessons.find(less => less.OId === lessonId);
        const expirationTimeInSeconds = 3600
        const currentTimestamp = Math.floor(Date.now() / 1000)
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
        const tokenA = RtcTokenBuilder.buildTokenWithUid(Agora.appId, Agora.appCertificate, lesson.OId, 0, RtcRole.PUBLISHER, privilegeExpiredTs);
        lesson.liveToken = tokenA;
        return lesson;

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
        await this.CourseModel.findByIdAndUpdate(course['_id'], course).exec();
        return course.content;
    }

    async reviewCourse(req: any, courseId: string, body: CourseReview): Promise<CourseReview[] | PromiseLike<CourseReview[]>> {
        let course = await this.CourseModel.findById(courseId).exec()
        body.OId = OverrideUtils.generateGUID();
        body.user = new ObjectId(req.user.id)
        body.time = Date.now()
        course.reviews === null ? course.reviews = [body] : course.reviews.push(body);
        await this.CourseModel.findByIdAndUpdate(course['_id'], course).exec();
        return (await this.CourseModel.findById(courseId).exec()).reviews;
    }
    async findOne(req: any, id: string): Promise<Course | PromiseLike<Course>> {
        let course = await this.CourseModel.findById(id).exec();

        course.teacher.user = await this.userService.findByTeacher(course.teacher['_id']);

        course.related = await this.CourseModel.find({
            $or: [
                { subject: course.subject['_id'] },
                { teacher: course.teacher['_id'] },
                { grade: course.grade['_id'] },
                { stage: course.stage['_id'] },
                { stage: course.stage['_id'] },
            ]
        });
        course.related = course.related.slice(0, 6);
        let progress = 0;
        let videos = 0;
        course.enrolled = Number((Math.random() * 100).toFixed(0))
        course.content.forEach(cont => {
            let contentProgress = 0;
            cont.lessons.forEach(less => {
                less.type.toString() === 'video' ? videos += 1 : videos += 0;
                less.type.toString() === 'video' && less.isDone ? contentProgress += 1 : contentProgress += 0;
            });
            progress += contentProgress;
        });
        course.progress = progress / videos * 100;
        for await (let review of course.reviews) {
            review.user = await this.userService.UserModel.findOne(review.user).exec()
        }
        course['cRating'] = course.reviews.length == 0 ? 5 : course.reviews.reduce((acc, review) => acc + review.stars, 0) / course.reviews.length;

        return course;
    }


    async getTeacherCourses(req: any): Promise<Course[] | PromiseLike<Course[]>> {
        if (req.user.userType !== UserType.teacher.toString()) {
            throw new BadRequestException('only teacher can view this request');
        }
        let teacher = (await this.userService.findOne(req.user.id))?.teacher;
        let courses = []
        if (teacher) {
            courses = await this.CourseModel.find({ teacher: teacher['_id'] }).exec();

            for await (let course of courses) {
                // course['progress'] = 100 - Math.random() * 100;

                let progress = 0;
                let videos = 0;
                course.content.forEach(cont => {
                    let contentProgress = 0;
                    cont.lessons.forEach(less => {
                        less.type.toString() === 'video' ? videos += 1 : videos += 0;
                        less.type.toString() === 'video' && less.isDone ? contentProgress += 1 : contentProgress += 0;
                    });
                    progress += contentProgress;
                });
                course.progress = progress / videos * 100;
                for await (let review of course.reviews) {
                    review.user = await this.userService.UserModel.findOne(review.user).exec()
                }
                course['cRating'] = course.reviews.length == 0 ? 5 : course.reviews.reduce((acc, review) => acc + review.stars, 0) / course.reviews.length;

            }

        }

        return courses;
    }

}