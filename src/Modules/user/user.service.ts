import { Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProfile } from '../../dtos/update-profile.dto';
import { Student } from '../../Models/student.model';
import { User, UserDocument, UserType } from '../../Models/user.model';
import { Lang } from '../../shared/enums/lang.enum';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectModel(User.name) private UserModel: Model<UserDocument>
    ) { }

    findByParent(parentId: any) {
        return this.UserModel.findOne({ parent: new ObjectId(parentId) }).lean().exec() as User;
    }
    findByStudent(studentId: any) {
        return this.UserModel.findOne({ student: new ObjectId(studentId) }).lean().exec() as User;
    }
    findByTeacher(teacherId: any) {
        return this.UserModel.findOne({ teacher: new ObjectId(teacherId) }).lean().exec() as User;
    }


    async login(username: string, defaultLang?: Lang) {
        let user = await this.UserModel.findOne({ $or: [{ email: username }, { phone: username }] }).exec();
        if (user) {
            user.defaultLang = defaultLang ?? Lang.en;
            user.updateOne(user)
        }
        return user
    }

    async myProfile(req): Promise<User> {
        return await this.findOne(req.user.id)
    }
    async updateProfile(req: any, profile: UpdateProfile): Promise<User> {
        let user = await this.findOne(req.user.id);
        if (user.userType === UserType.student){
            let student = new Student()
            if (profile.gradeId){
                
            }
        }
            throw new Error('Method not implemented.');
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
        return this.UserModel.find().exec();
    }
    async findOne(id: string): Promise<User> {
        return this.UserModel.findById(id).exec();
    }
    async update(id: string, req: User): Promise<User> {
        await this.UserModel.findByIdAndUpdate(id, req);
        return this.findOne(id)
    }
    async remove(id: string): Promise<User> {
        return await this.UserModel.findByIdAndRemove(id);
    }
}