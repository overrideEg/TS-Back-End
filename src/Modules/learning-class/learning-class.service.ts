import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { parse } from 'cookie';
import { AuthService } from '../auth/auth.service';
import { Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AttendanceLog, ChatMessage, LearningClass, LearningClassDocument } from '../../Models/learning-class.model';
import { sendLiveMessageDTO, StartLiveDTO } from '../../dtos/start-live.dto';
import { User } from '../../Models/user.model';
import { CourseService } from '../course/course.service';
import { RtcRole, RtcTokenBuilder } from 'agora-access-token';
import { Agora } from '../auth/Security/constants';
import { CheckoutService } from '../checkout/checkout.service';
import { NoticeService } from '../notice/notice.service';
import { Lang } from '../../shared/enums/lang.enum';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class LearningClassService {




    constructor(
        @InjectModel(LearningClass.name) private model: Model<LearningClassDocument>,
        public authenticationService: AuthService,
        private checkoutService: CheckoutService,
        private courseService: CourseService,
        private noticeService: NoticeService) { }

    async getUserFromSocket(socket: Socket) {
        let token = socket.request.headers.authorization;
        const user = await this.authenticationService.getUserFromAuthenticationToken(token);
        if (!user) {
            throw new WsException('Invalid credentials.');
        }
        return user;
    }

    async startLive(user: User, body: StartLiveDTO) {
        let course = await this.courseService.findById(body.courseId);

        if (course.teacher['_id'].toString() !== user['_id'].toString())
            throw new WsException('only teacher can start his live');

        let content = course.content.find(content => content.lessons.find(less => less.OId === body.lessonId));
        if (!content) {
            throw new WsException('lesson content is invalid');
        }
        let lesson = content.lessons.find(less => less.OId === body.lessonId);
        if (!lesson) {
            throw new WsException('lesson is invalid');
        }

        let existsClass = await this.model.findOne({
            course: new ObjectId(body.courseId),
            lesson: lesson
        }).exec();

        const expirationTimeInSeconds = 3600
        const currentTimestamp = Math.floor(Date.now() / 1000)
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds

        if (existsClass) {
            if (existsClass.endTime) {
                throw new Error(`This Lesson has Ended At ${new Date(existsClass.endTime).toTimeString()}`);

            }
            return existsClass;
        }

        let lClass = new LearningClass();
        lClass.course = course;
        lClass.lesson = lesson;
        lClass.startTime = Date.now();

        const teacherToken = RtcTokenBuilder.buildTokenWithUid(Agora.appId, Agora.appCertificate, lesson.OId, 0, RtcRole.PUBLISHER, privilegeExpiredTs);
        const studentToken = RtcTokenBuilder.buildTokenWithUid(Agora.appId, Agora.appCertificate, lesson.OId, 0, RtcRole.SUBSCRIBER, privilegeExpiredTs);
        lClass.teacherToken = teacherToken;
        lClass.studentToken = studentToken;
        lClass.attenders = 0;
        const firstChatMessage = new ChatMessage();
        firstChatMessage.time = Date.now();
        firstChatMessage.user = user;
        firstChatMessage.message = `${user.name} started ${content.chapter} session`
        lClass.chat = [firstChatMessage];

        var checkouts = await this.checkoutService.CheckoutModel.find({ course: new ObjectId(body.courseId) }).exec()
        for await (const checkout of checkouts) {

            this.noticeService.sendSpecificNotification({
                userId: checkout.user['_id'].toString(),
                notification: {
                    title: checkout.user.defaultLang == Lang.en ? 'Live Lesson Stated' : 'بدأ البث المباشر للدرس',
                    body: checkout.user.defaultLang == Lang.en ? `${course.teacher.name} started live session on lesson ${lesson.name}, join now` : `${course.teacher.name} بدأ بث مباشر لدرس ${lesson.name}`
                }, data: { entityType: 'Course', entityId: course['_id'].toString() }, imageURL: course.cover
            })

        }

        return await this.model.create(lClass);
    }



    async joinLive(user: User, body: StartLiveDTO) {
        let checkout = await this.checkoutService.CheckoutModel.findOne({ course: new ObjectId(body.courseId), user: new ObjectId(user['_id'].toString()) })
        if (!checkout)
            throw new BadRequestException('you dont purchased this course');
        let course = checkout.course;

        let content = course.content.find(content => content.lessons.find(less => less.OId === body.lessonId));
        if (!content) {
            throw new WsException('lesson content is invalid');
        }
        let lesson = content.lessons.find(less => less.OId === body.lessonId);
        if (!lesson) {
            throw new WsException('lesson is invalid');
        }


        let existsClass = await this.model.findOne({
            course: new ObjectId(body.courseId),
            lesson: lesson
        }).exec();


        if (!existsClass) {
            throw new WsException(`this course not started yet`)

        }
        if (existsClass.endTime) {
            throw new WsException(`lesson ended at ${new Date(existsClass.endTime).toTimeString()}`)
        }
        existsClass.attenders += 1;
        let attendanceLog = new AttendanceLog();
        attendanceLog.time = Date.now();
        attendanceLog.user = user;
        existsClass.attendanceLogs.push(attendanceLog);
        const joinChatMessage = new ChatMessage();
        joinChatMessage.time = Date.now();
        joinChatMessage.user = user;
        joinChatMessage.message = `${user.name} joined`
        existsClass.chat.push(joinChatMessage);
        await this.model.updateOne({ _id: existsClass['_id'] }, existsClass);
        const expirationTimeInSeconds = 3600
        const currentTimestamp = Math.floor(Date.now() / 1000)
        const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds
        return existsClass;

    }


    async leave(user: User, body: StartLiveDTO) {
        let checkout = await this.checkoutService.CheckoutModel.findOne({ course: new ObjectId(body.courseId), user: new ObjectId(user['_id'].toString()) })
        if (!checkout)
            throw new BadRequestException('you dont purchased this course');
        let course = checkout.course;

        let content = course.content.find(content => content.lessons.find(less => less.OId === body.lessonId));
        if (!content) {
            throw new WsException('lesson content is invalid');
        }
        let lesson = content.lessons.find(less => less.OId === body.lessonId);
        if (!lesson) {
            throw new WsException('lesson is invalid');
        }

        let existsClass = await this.model.findOne({
            course: new ObjectId(body.courseId),
            lesson: lesson
        }).exec();


        if (!existsClass) {
            throw new WsException(`this course not started yet`)

        }
        if (existsClass.attenders > 0)
            existsClass.attenders -= 1;
        const leaveMessage = new ChatMessage();
        leaveMessage.time = Date.now();
        leaveMessage.user = user;
        leaveMessage.message = `${user.name} leaved`
        existsClass.chat.push(leaveMessage);
        await this.model.updateOne({ _id: existsClass['_id'] }, existsClass);

        return await this.model.findOne({
            course: new ObjectId(body.courseId),
            lesson: lesson
        }).exec();;
    }


    async endLive(user: User, body: StartLiveDTO) {
        let course = await this.courseService.findById(body.courseId);

        if (course.teacher['_id'].toString() !== user['_id'].toString())
            throw new WsException('only teacher can end his live');

        let content = course.content.find(content => content.lessons.find(less => less.OId === body.lessonId));
        if (!content) {
            throw new WsException('lesson content is invalid');
        }
        let lesson = content.lessons.find(less => less.OId === body.lessonId);
        if (!lesson) {
            throw new WsException('lesson is invalid');
        }

        let existsClass = await this.model.findOne({
            course: new ObjectId(body.courseId),
            lesson: lesson
        }).exec();


        if (existsClass) {
            existsClass['endTime'] = Date.now();
            await this.model.updateOne({ _id: existsClass['_id'] }, existsClass);
        }
        lesson.isDone = true;
        await this.courseService.CourseModel.updateOne({ _id: body.courseId }, course);
        return existsClass;
    }

    async sendMessage(user: User, body: sendLiveMessageDTO) {
        let course = await this.courseService.findById(body.courseId);

        let content = course.content.find(content => content.lessons.find(less => less.OId === body.lessonId));
        if (!content) {
            throw new WsException('lesson content is invalid');
        }
        let lesson = content.lessons.find(less => less.OId === body.lessonId);
        if (!lesson) {
            throw new WsException('lesson is invalid');
        }

        let existsClass = await this.model.findOne({
            course: new ObjectId(body.courseId),
            lesson: lesson
        }).exec();
        let message = new ChatMessage()
        message.message = body.message;
        message.time = Date.now();
        message.user = user;
        existsClass.chat.push(message)
        await this.model.updateOne({ _id: existsClass['_id'] }, existsClass)
        return (await this.model.findById(existsClass['_id'])).chat
    }


}





