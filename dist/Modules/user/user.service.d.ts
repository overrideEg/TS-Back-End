import { Status } from './../../enums/status.enum';
import { Model } from 'mongoose';
import { TeacherProfile } from '../../dtos/teacher-profile.dto';
import { UpdateProfile } from '../../dtos/update-profile.dto';
import { TransactionType } from '../../enums/wallet.enum';
import { BankAccount, BankAccountDocument } from '../../models/bank-account.model';
import { CheckoutDocument } from '../../models/checkout.model';
import { StudentReview, StudentReviewDocument } from '../../models/student-review.model';
import { User, UserDocument } from '../../models/user.model';
import { Wallet, WalletDocument } from '../../models/wallet-model';
import { Lang } from '../../shared/enums/lang.enum';
import { CheckoutService } from '../checkout/checkout.service';
import { CourseService } from '../course/course.service';
import { NoticeService } from '../notice/notice.service';
export declare class UserService {
    UserModel: Model<UserDocument>;
    BankAccountModel: Model<BankAccountDocument>;
    WalletModel: Model<WalletDocument>;
    StudentReviewModel: Model<StudentReviewDocument>;
    private courseService;
    private checkoutService;
    private noticeService;
    private readonly logger;
    constructor(UserModel: Model<UserDocument>, BankAccountModel: Model<BankAccountDocument>, WalletModel: Model<WalletDocument>, StudentReviewModel: Model<StudentReviewDocument>, courseService: CourseService, checkoutService: CheckoutService, noticeService: NoticeService);
    login(username: string, defaultLang?: Lang): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    myProfile(req: any): Promise<User>;
    updateProfile(req: any, profile: UpdateProfile): Promise<User>;
    validate(payload: any): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    ifUserExists(email: string, phone: string): Promise<boolean>;
    save(req: User): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(userType: any): Promise<User[]>;
    findOne(id: string): Promise<User>;
    update(id: string, req: User): Promise<User>;
    teacherStatus(id: string): Promise<any>;
    remove(id: string): Promise<User>;
    getTeacherProfile(id: string): Promise<TeacherProfile>;
    addBankAccount(req: any, body: BankAccount): Promise<BankAccount[]>;
    getBankAccounts(req: any): Promise<BankAccount[]>;
    withDrawCash(req: any, accountId: string, amount: number): Promise<Wallet[]>;
    approveTransaction(teacherId: string, walletId: string): Promise<Wallet>;
    createWalletForCheckout(checkoutSaved: CheckoutDocument): Promise<void>;
    getWallets(type: TransactionType, status: Status): Promise<any[]>;
    reviewStudent(req: any, studentId: string, courseId: string, body: StudentReview): Promise<StudentReview[]>;
    deleteBankAccount(req: any, accountId: string): Promise<BankAccount[]>;
    getStudentReviews(req: any, studentId: string, subjectId: string): Promise<{}>;
}
