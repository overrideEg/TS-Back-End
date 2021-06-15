import { BadRequestException, Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { use } from 'passport';
import { UpdateProfile } from '../../dtos/update-profile.dto';
import { Student, StudentDocument } from '../../Models/student.model';
import { Teacher, TeacherDocument } from '../../Models/teacher.model';
import { User, UserDocument, UserType } from '../../Models/user.model';
import { Lang } from '../../shared/enums/lang.enum';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectModel(User.name) public UserModel: Model<UserDocument>,
        @InjectModel(Student.name) private StudentModel: Model<StudentDocument>,
        @InjectModel(Teacher.name) private TeacherModel: Model<TeacherDocument>
    ) { }

    async findByParent(parentId: any) {
        return await this.UserModel.findOne({ parent: new ObjectId(parentId) }).exec() as User;
    }
    async findByStudent(studentId: any) {
        return await this.UserModel.findOne({ student: new ObjectId(studentId) }).exec() as User;
    }
    async findByTeacher(teacherId: any) {
        return await this.UserModel.findOne({ teacher: new ObjectId(teacherId) }).exec() as User;
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
        if (profile.name) {
            user.name = profile.name;
        }
        if (profile.avatar){
            user.avatar = profile.avatar;
        }
        if (profile.email) {
            let existsEmail = await this.UserModel.findOne({ email: profile.email })
            if (existsEmail && req.user.email != profile.email)
                throw new BadRequestException('this email is used by other user')
            user.email = profile.email
        }
        if (user.userType === UserType.student) {
            let student = user.student;
            if (profile.gradeId) {
                student.grade['_id'] = profile.gradeId
            }
            if (profile.stageId) {
                student.stage['_id'] = profile.stageId
            }
            if (profile.cityId) {
                student.city['_id'] = profile.cityId
            }
            await this.StudentModel.updateOne({ _id: student['_id'] }, student)
        }
        if (user.userType === UserType.teacher) {
            let teacher = user.teacher;

            if (profile.cityId) {
                teacher.city['_id'] = profile.cityId
            }
            if (profile.bio) {
                teacher.bio = profile.bio;
            }
            await this.TeacherModel.updateOne({ _id: teacher['_id'] }, teacher);
        }

        return await this.update(req.user.id, user);
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
    async findAll(userType): Promise<User[]> {
        return userType ? this.UserModel.find({ userType: userType }).exec() : this.UserModel.find().exec();
    }
    async findOne(id: string): Promise<User> {
        return this.UserModel.findById(id).exec();
    }
    async update(id: string, req: User): Promise<User> {
        await this.UserModel.findByIdAndUpdate(id, req);
        return this.findOne(id);
    }
    async remove(id: string): Promise<User> {
        return await this.UserModel.findByIdAndRemove(id);
    }
}