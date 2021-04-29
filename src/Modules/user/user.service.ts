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
        return this.UserModel.find({ parent: new ObjectId(parentId) }).populate('student').populate('parent').populate('teacher').lean().exec();
    }
    findByStudent(studentId: any) {
        return this.UserModel.find({ student: new ObjectId(studentId) }).populate('student').populate('parent').populate('teacher').lean().exec();
    }
    findByTeacher(teacherId: any) {
        return this.UserModel.find({ teacher: new ObjectId(teacherId) }).populate('student').populate('parent').populate('teacher').lean().exec();
    }
    async login(username: string, defaultLang?: Lang) {
        let user = await this.UserModel.findOne({ $or: [{ email: username }, { phone: username }] }).populate('student').populate('parent').populate('teacher').exec();
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
        return this.UserModel.find().populate('student').populate('parent').populate('teacher').exec();
    }
    async findOne(id: string): Promise<User> {
        return this.UserModel.findById(id).populate('student').populate('parent').populate('teacher').exec();
    }
    async update(id: string, req: User): Promise<User> {
        await this.UserModel.findByIdAndUpdate(id, req);
        return this.findOne(id)
    }
    async remove(id: string): Promise<User> {
        return await this.UserModel.findByIdAndRemove(id);
    }
}