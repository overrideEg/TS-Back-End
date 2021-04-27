import { Injectable, Logger } from '@nestjs/common';


import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../Models/user.model';
import { Lang } from '../../shared/enums/lang.enum';
@Injectable()
export class UserService {
    async login(username: string, defaultLang?: Lang) {
       let user =  await this.UserModel.findOne({$or:[{email: username},{phone: username}]}).populate('student').populate('parent').populate('teacher').exec();
       if (user){
           user.defaultLang = defaultLang ?? Lang.en ;
           user.updateOne(user)
       }
       return user
    }
    
    private readonly logger = new Logger(UserService.name);
    validate(payload: any) {
        this.logger.debug(payload)
        return true;
    }
    constructor(
        @InjectModel(User.name) private UserModel: Model<UserDocument>
    ) { }
    ifUserExists(email: string, phone: string) {
        return this.UserModel.exists({$or:[{email: email},{phone: phone}]})
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