import { AuthService } from './auth.service';
import { ChangePassword, ResetPassword } from './DTOs/change-password.dto';
import { Login } from './DTOs/login.dto';
import { refreshToken } from './DTOs/refreshToken.dto';
import { RegisterAdmin, RegisterParent, RegisterStudent, RegisterTeacher } from './DTOs/register.dto';
export declare class AuthController {
    private service;
    constructor(service: AuthService);
    login(body: Login): Promise<any>;
    activate(req: any, code: string): Promise<any>;
    refreshToken(refresh: refreshToken): Promise<any>;
    requestToken(macAddress: string): {
        token: string;
    };
    resetPassword(username: string): Promise<any>;
    newPassword(req: any, newPass: ResetPassword): Promise<any>;
    changePassword(req: any, changePassword: ChangePassword): Promise<any>;
    resendCode(req: any): Promise<any>;
    registerAdmin(body: RegisterAdmin): Promise<any>;
    registerStudent(body: RegisterStudent): Promise<any>;
    registerTeacher(body: RegisterTeacher): Promise<any>;
    registerParent(body: RegisterParent): Promise<any>;
}
