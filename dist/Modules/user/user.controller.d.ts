import { TeacherProfile } from '../../dtos/teacher-profile.dto';
import { UpdateProfile } from '../../dtos/update-profile.dto';
import { BankAccount } from '../../models/bank-account.model';
import { StudentReview } from '../../models/student-review.model';
import { User } from '../../models/user.model';
import { UserService } from './user.service';
export declare class UserController {
    private service;
    constructor(service: UserService);
    saveUser(req: User): Promise<User>;
    getAllUsers(userType: string): Promise<User[]>;
    getMyProfile(req: any): Promise<User>;
    getTeacherProfile(id: string): Promise<TeacherProfile>;
    getBankAccounts(req: any): Promise<BankAccount[]>;
    getWallets(type: string, status: string): Promise<any[]>;
    ReviewStudent(req: any, studentId: string, courseId: string, body: StudentReview): Promise<StudentReview[]>;
    studentReview(req: any, studentId: string, subjectId: string): Promise<{}>;
    findOne(id: string): Promise<User>;
    approveTeacher(id: string): Promise<any>;
    updateUser(id: string, req: User): Promise<any>;
    updateProfile(req: any, profile: UpdateProfile): Promise<User>;
    deleteUser(id: string): Promise<any>;
    addBankAcount(req: any, body: BankAccount): Promise<BankAccount[]>;
    withdrawCash(req: any, accountId: string, amount: number): Promise<import("../../models/wallet-model").Wallet[]>;
    approveTransaction(teacherId: string, walletId: string): Promise<import("../../models/wallet-model").Wallet>;
    deleteBankAcount(req: any, accountId: string): Promise<BankAccount[]>;
}
