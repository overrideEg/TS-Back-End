import { BadRequestException, forwardRef, Inject, Injectable, Logger } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeacherProfile } from '../../dtos/teacher-profile.dto';
import { UpdateProfile } from '../../dtos/update-profile.dto';
import { TransactionType, TransactionStatus } from '../../enums/wallet.enum';
import { BankAccount, BankAccountDocument } from '../../Models/bank-account.model';
import {  CheckoutDocument } from '../../Models/checkout.model';
import { Course } from '../../Models/course.model';
import { StudentReview, StudentReviewDocument, StudentReviewSchema } from '../../Models/student-review.model';
import { User, UserDocument, UserType } from '../../Models/user.model';
import { Wallet, WalletDocument } from '../../Models/wallet-model';

import { Lang } from '../../shared/enums/lang.enum';
import { OverrideUtils } from '../../shared/override-utils';
import { CheckoutService } from '../checkout/checkout.service';
import { CourseService } from '../course/course.service';
const ObjectId = require('mongoose').Types.ObjectId;

@Injectable()
export class UserService {



    private readonly logger = new Logger(UserService.name);

    constructor(
        @InjectModel(User.name) public UserModel: Model<UserDocument>,
        @InjectModel(BankAccount.name) public BankAccountModel: Model<BankAccountDocument>,
        @InjectModel(Wallet.name) public WalletModel: Model<WalletDocument>,
        @InjectModel(StudentReview.name) public StudentReviewModel: Model<StudentReviewDocument>,
        @Inject(forwardRef(() => CourseService)) private courseService: CourseService,
        @Inject(forwardRef(() => CheckoutService)) private checkoutService: CheckoutService,
    ) { }



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
        if (profile.avatar) {
            user.avatar = profile.avatar;
        }
        if (profile.email) {
            let existsEmail = await this.UserModel.findOne({ email: profile.email })
            if (existsEmail && req.user.email != profile.email)
                throw new BadRequestException('this email is used by other user')
            user.email = profile.email
        }
        if (user.userType === UserType.student) {
            if (profile.gradeId) {
                user.grade['_id'] = profile.gradeId
            }
            if (profile.stageId) {
                user.stage['_id'] = profile.stageId
            }
            if (profile.cityId) {
                user.city['_id'] = profile.cityId
            }
        }
        if (user.userType === UserType.teacher) {

            if (profile.cityId) {
                user.city['_id'] = profile.cityId
            }
            if (profile.bio) {
                user.bio = profile.bio;
            }
        }

        return await this.update(req.user.id, user);
    }

    async validate(payload: any) {
        return await this.UserModel.exists({ _id: payload.id });
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
        let user = await this.UserModel.findById(id).exec();
        return user;
    }
    async update(id: string, req: User): Promise<User> {
        await this.UserModel.findByIdAndUpdate(id, req);
        return this.findOne(id);
    }
    async remove(id: string): Promise<User> {
        return await this.UserModel.findByIdAndRemove(id);
    }


    async getTeacherProfile(id: string): Promise<TeacherProfile> {
        let user = await this.findOne(id);
        let courses = await this.courseService.CourseModel.find({ teacher: user }).sort({ createdAt: 'desc' }).exec();
        for await (const course of courses) {
            course.related = [];
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
                review.user = await this.UserModel.findOne(review.user).exec()
            }
            course['cRating'] = course.reviews.length == 0 ? 5 : course.reviews.reduce((acc, review) => acc + review.stars, 0) / course.reviews.length;
        }
        let profile = new TeacherProfile();
        profile.bio = user.bio;
        profile.courses = courses;
        profile.noOfCourses = courses.length;
        profile.name = user.name;
        profile.userId = user['_id'];
        profile.avatar = user['avatar'] ?? '';
        profile.rate = courses.reduce((acc, course) => acc + course.cRating, 0) / courses.length;
        
        profile.noOfStudents = await this.checkoutService.CheckoutModel.countDocuments().populate({
            "path": "course",
            'model': Course.name
        }).populate({
            path: 'course.teacher._id',
            "match": new ObjectId(user['_id'])
        });
        return profile;
    }

    async addBankAccount(req: any, body: BankAccount) {
        let teacher = await this.findOne(req.user.id);
        let BankAccount = await this.BankAccountModel.create(body);
        teacher.bankAccounts.push(BankAccount);
        await this.UserModel.updateOne({ _id: teacher['_id'] }, teacher);
        return teacher.bankAccounts;
    }

    async getBankAccounts(req: any) {
        let teacher = await this.findOne(req.user.id);
        if (!teacher)
            throw new BadRequestException('no user found');
        return teacher.bankAccounts
    }

    async withDrawCash(req: any, accountId: string, amount: number) {
        let teacher = await this.findOne(req.user.id);
        if (!teacher)
            throw new BadRequestException('no user found');
        let account = teacher.bankAccounts.find((acc) => acc['_id'] === accountId);
        let balance = teacher.wallet.reduce((acc, wall) => acc + (wall.type === TransactionType.in ? wall.value : (wall.status === TransactionStatus.approved ? wall.value : 0)), 0);
        if (balance > amount)
            throw new BadRequestException(`your balance is ${balance} and you requested ${amount}`);
        let wallet = new Wallet();
        wallet.account = account;
        wallet.value = amount;
        wallet.date = Date.now();
        wallet.status = TransactionStatus.pending;
        wallet.value = amount;
        wallet.type = TransactionType.out;
        wallet = await this.WalletModel.create(wallet);
        teacher.wallet.push(wallet);
        await this.UserModel.updateOne({ _id: teacher['_id'] }, teacher);
        //TODO Send Notfifcation to teacher and admins
        return teacher.wallet
    }

    async approveTransaction(teacherId: string, walletId: string) {
        let teacher = await this.UserModel.findById(teacherId).exec();
        let wallet = teacher?.wallet?.find(wall => wall['_id'] === walletId);
        if (!teacher || !wallet)
            throw new BadRequestException('Check sent IDs');
        wallet.status = TransactionStatus.approved;
        await this.UserModel.updateOne({ _id: teacher['_id'] }, teacher);
        //TODO Send Notfifcation to teacher and admins
        return wallet;
    }


    async createWalletForCheckout( checkoutSaved: CheckoutDocument) {
        let wallet = new Wallet()
        wallet.date = Date.now()
        wallet.type = TransactionType.in;
        wallet.status = TransactionStatus.approved;
        wallet.value = checkoutSaved.price
        wallet.checkout = checkoutSaved;
        wallet = await this.WalletModel.create(wallet);
        checkoutSaved.course.teacher.wallet.push(wallet);
        await this.UserModel.updateOne({ _id: checkoutSaved.course.teacher['_id'] }, checkoutSaved.course.teacher)
    }
    async getWallets(type: TransactionType, status: TransactionStatus) {
        let teachers = await this.UserModel.find({ userType: UserType.teacher }).exec();
        let wallets = [];
        teachers.forEach(teacher => {
            teacher.wallet.forEach(wallet => {
                if (!type || !status) {
                    wallets.push(wallet)
                }
                if (wallet.type === type && wallet.status === status) {
                    wallets.push(wallet)
                }
            })
        })
        return wallets;
    }


    async reviewStudent(req: any, studentId: string, courseId: string, body: StudentReview) {
        body.course = new ObjectId(courseId);
        body.valueDate = Date.now();
        let student = await this.UserModel.findById(studentId);
        let savedReview = await this.StudentReviewModel.create(body)
        student.studentReviews.push(savedReview);
        await this.UserModel.updateOne({ _id: studentId }, student);
        return student.studentReviews;
    }

    async deleteBankAccount(req: any, accountId: string) {
        let teacher = await this.findOne(req.user.id);
        teacher.bankAccounts.splice(teacher.bankAccounts.findIndex((acc) => acc['_id'] === accountId), 1);
        await this.BankAccountModel.deleteOne({ _id: accountId });
        await this.UserModel.updateOne({ _id: teacher['_id'] }, teacher);
        return teacher.bankAccounts;
    }
}