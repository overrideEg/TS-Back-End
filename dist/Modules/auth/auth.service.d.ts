import { UserService } from '../user/user.service';
import { Login } from './DTOs/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterAdmin, RegisterParent, RegisterStudent, RegisterTeacher } from './DTOs/register.dto';
import { User } from '../../models/user.model';
import { refreshToken } from './DTOs/refreshToken.dto';
import { ChangePassword, ResetPassword } from './DTOs/change-password.dto';
import { HttpService } from '@nestjs/axios';
export declare class AuthService {
    private userService;
    private jwtService;
    private httpService;
    constructor(userService: UserService, jwtService: JwtService, httpService: HttpService);
    getUserFromAuthenticationToken(token: string): Promise<User>;
    sign(user: User): string;
    requestToken(macAddress: string): {
        token: string;
    };
    changePassword(req: any, body: ChangePassword): Promise<any>;
    newPassword(req: any, body: ResetPassword): Promise<any>;
    resetPassword(username: string): Promise<any>;
    refreshToken(refresh: refreshToken): Promise<any>;
    resendCode(req: any): Promise<any>;
    sendOTPSMS(number: string, tempCode: string): Promise<void>;
    activate(req: any, code: string): Promise<any>;
    login(body: Login): Promise<any>;
    registerAdmin(body: RegisterAdmin): Promise<any>;
    registerTeacher(body: RegisterTeacher): Promise<any>;
    registerParent(body: RegisterParent): Promise<any>;
    registerStudent(body: RegisterStudent): Promise<any>;
}
