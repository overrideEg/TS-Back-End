import { Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../Models/user.model';
import { Lang } from '../../shared/enums/lang.enum';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectModel(User.name) private UserModel: Model<UserDocument>
    ) { }

    findByParent(parentId: any) {
        return this.UserModel.findOne({ parent: new ObjectId(parentId) }).populate('student').populate('parent').populate('teacher').lean().exec() as User;
    }
    findByStudent(studentId: any) {
        return this.UserModel.findOne({ student: new ObjectId(studentId) }).populate('student').populate('parent').populate('teacher').lean().exec() as User;
    }
    findByTeacher(teacherId: any) {
        return this.UserModel.findOne({ teacher: new ObjectId(teacherId) }).populate('student').populate('parent').populate('teacher').lean().exec() as User;
    }
    async login(username: string, defaultLang?: Lang) {
        let user = await this.UserModel.findOne({ $or: [{ email: username }, { phone: username }] })
            .populate('student')
            .populate({
                path: 'student',
                populate: { path: 'city', model: 'City', },
            })
            .populate({
                path: 'student',
                populate: { path: 'grade', model: 'Grade', },
            })
            .populate({
                path: 'student',
                populate: { path: 'stage', model: 'Stage', },
            })
            .populate('parent')
            .populate({
                path: 'parent',
                populate: { path: 'students', model: 'Student', },
            })
            .populate('teacher')
            .populate({
                path: 'teacher',
                populate: { path: 'city', model: 'City', },
            })
            .exec();
        if (user) {
            user.defaultLang = defaultLang ?? Lang.en;
            user.updateOne(user)
        }
        return user
    }

    validate(payload: any) {
        this.logger.debug(payload)
        return true;
    }
    ifUserExists(email: string, phone: string) {
        return this.UserModel.exists({ $or: [{ email: email }, { phone: phone }] })
    }
    async save(req: User) {
        return await this.UserModel.create(req);
    }
    async findAll(): Promise<User[]> {
        return this.UserModel.find()
        .populate('student')
            .populate({
                path: 'student',
                populate: { path: 'city', model: 'City', },
            })
            .populate({
                path: 'student',
                populate: { path: 'grade', model: 'Grade', },
            })
            .populate({
                path: 'student',
                populate: { path: 'stage', model: 'Stage', },
            })
            .populate('parent')
            .populate({
                path: 'parent',
                populate: { path: 'students', model: 'Student', },
            })
            .populate('teacher')
            .populate({
                path: 'teacher',
                populate: { path: 'city', model: 'City', },
            })
            .exec();
    }
    async findOne(id: string): Promise<User> {
        return this.UserModel.findById(id)
        .populate('student')
            .populate({
                path: 'student',
                populate: { path: 'city', model: 'City', },
            })
            .populate({
                path: 'student',
                populate: { path: 'grade', model: 'Grade', },
            })
            .populate({
                path: 'student',
                populate: { path: 'stage', model: 'Stage', },
            })
            .populate('parent')
            .populate({
                path: 'parent',
                populate: { path: 'students', model: 'Student', },
            })
            .populate('teacher')
            .populate({
                path: 'teacher',
                populate: { path: 'city', model: 'City', },
            })
        .exec();
    }
    async update(id: string, req: User): Promise<User> {
        await this.UserModel.findByIdAndUpdate(id, req);
        return this.findOne(id)
    }
    async remove(id: string): Promise<User> {
        return await this.UserModel.findByIdAndRemove(id);
    }
}