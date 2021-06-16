import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Login } from './DTOs/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterAdmin, RegisterParent, RegisterStudent, RegisterTeacher } from './DTOs/register.dto';
import { User, UserType } from '../../Models/user.model';
import { OverrideUtils } from '../../shared/override-utils';
import { Teacher } from '../../Models/teacher.model';
import { TeacherService } from '../teacher/teacher.service';
import { Student } from '../../Models/student.model';
import { StudentService } from '../student/student.service';
import { Parent } from '../../Models/parent.model';
import { ParentService } from '../parent/parent.service';
import { City } from '../../Models/city.model';
import { Grade } from '../../Models/grade.model';
import { Stage } from '../../Models/stage.model';
import { refreshToken } from './DTOs/refreshToken.dto';
import { Lang } from '../../shared/enums/lang.enum';
import { ChangePassword, ResetPassword } from './DTOs/change-password.dto';
import { jwtConstants } from './Security/constants';


@Injectable()
export class AuthService {




    constructor(
        private userService: UserService,
        private teacherService: TeacherService,
        private studentService: StudentService,
        private parentService: ParentService,
        private jwtService: JwtService) { }

    public async getUserFromAuthenticationToken(token: string) {
        token = token.substr(7);
        const payload = this.jwtService.verify(token, {
            secret: jwtConstants.secret
        });
        if (payload.id) {
            return this.userService.findOne(payload.id);
        }
    }
    sign(user: User) {
        return this.jwtService.sign({ id: user['_id'], email: user['email'], phone: user['phone'], userType: user['userType'] })
    }



    requestToken(macAddress: string) {
        return {
            token: this.jwtService.sign({ id: null, email: null, phone: null, userType: UserType.student, macAddress: macAddress } ,{expiresIn: '1h'})
        }
    }

    async changePassword(req: any, body: ChangePassword) {
        let user = await this.userService.findOne(req.user.id);
        if (!user)
            throw new UnauthorizedException('check your credintials');
        if (OverrideUtils.dycreptPassword(user.password) !== body.oldPassword)
            throw new UnauthorizedException('check your credintials');

        user.password = OverrideUtils.encryptPassword(body.newPassword);
        user.isActive = true;
        user.tempCode = "";
        user = await this.userService.update(user['_id'], user);
        return {
            ...user['_doc'],
            token: this.sign(user),
        };

    }
    async newPassword(req, body: ResetPassword) {
        let user = await this.userService.findOne(req.user.id);
        if (!user)
            throw new UnauthorizedException('check your credintials');

        if (!user.isActive)
            user.password = OverrideUtils.encryptPassword(body.newPassword);
        user.isActive = true;
        user.tempCode = "";
        user = await this.userService.update(user['_id'], user);
        return {
            ...user['_doc'],
            token: this.sign(user),
        };
    }


    async resetPassword(username: string) {
        let user;
        user = await this.userService.login(username);
        if (!user)
            throw new UnauthorizedException('check your credintials');
        user.tempCode = "00000";
        user.isActive = false;
        user = await this.userService.update(user['_id'], user);
        return {
            ...user['_doc'],
            token: this.sign(user),
        };
    }
    async refreshToken(refresh: refreshToken) {
        const decodedToken = this.jwtService.decode(refresh.oldtoken) as any
        if (decodedToken.email == refresh.email && decodedToken.exp <= new Date().getTime()) {
            const user = await this.userService.login(refresh.email, Lang.en)
            return {
                ...user['_doc'],
                token: this.sign(user),
            };
        } else {
            throw new UnauthorizedException("Can Not Refresh Token")
        }
    }
    async resendCode(req: any) {
        let user = await this.userService.findOne(req.user.id);
        if (!user)
            throw new UnauthorizedException('check your credintials');
        user.tempCode = '54321';
        user.isActive = false;
        user = await this.userService.update(user['_id'], user);
        return {
            ...user['_doc'],
            token: this.sign(user),
        };
    }

    async activate(req: any, code: string) {
        let user = await this.userService.findOne(req.user.id);
        if (!user)
            throw new UnauthorizedException('check your credintials');
        if (user.isActive === false && user.tempCode !== code)
            throw new UnauthorizedException('invalid code');
        user.isActive = true;
        user.tempCode = "";
        user = await this.userService.update(user['_id'], user);
        return {
            ...user['_doc'],
            token: this.sign(user),
        };
    }
    async login(body: Login) {
        let user = await this.userService.login(body.username, body.defaultLang);
        if (!user)
            throw new UnauthorizedException('check your credintials');
        // if (!user.isActive)
        //     throw new UnauthorizedException('please activate your account');
        if (OverrideUtils.dycreptPassword(user.password) !== body.password)
            throw new UnauthorizedException('check your credintials');

        if (user.userType === UserType.parent) {
            if (!body.studentId)
                throw new UnauthorizedException('please enter student id');

            let student = await this.studentService.findByStudentId(body.studentId);
            if (!student)
                throw new UnauthorizedException('please enter correct student id');

            if (!user.parent.students.find(st => st === student['_id'])) {
                user.parent.students.push(student);
                await this.parentService.update(user.parent['_id'], user.parent);
            }
        }



        return {
            ...user['_doc'],
            token: this.sign(user),
        };


    }
    async registerAdmin(body: RegisterAdmin) {

        //check if user exists;
        if (await this.userService.ifUserExists(body.email, body.phone)) {
            throw new BadRequestException('user already exists');
        }
        //create user
        let user = new User();
        user.userType = UserType.admin;
        user.name = body.name;
        user.fcmTokens = body.fcmToken != null ? [body.fcmToken] : []
        user.password = OverrideUtils.encryptPassword(body.password);
        user.email = body.email;
        user.defaultLang = body.defaultLang;
        user.phone = body.phone;
        user.isActive = true;
        let savedUser = await this.userService.save(user).catch(reason => {
            throw new BadRequestException('can not create user  ', reason)
        });

        //signed token
        return {
            ...savedUser['_doc'],
            token: this.sign(savedUser),
        };

    }
    async registerTeacher(body: RegisterTeacher) {
        //check if user exists;
        if (await this.userService.ifUserExists(body.email, body.phone)) {
            throw new BadRequestException('user already exists');
        }
        //create teacher
        let teacher = new Teacher();
        teacher.city = new City();

        teacher.additionalPhone = body.additionalPhone;
        teacher.city['_id'] = body.cityId;
        teacher.coverletter = body.coverLetter;
        teacher.resume = body.resume;
        let savedTeacher = await this.teacherService.save(teacher);
        //create user
        let user = new User();
        user.userType = UserType.teacher;
        user.name = body.name;
        user.fcmTokens = body.fcmToken != null ? [body.fcmToken] : []
        user.password = OverrideUtils.encryptPassword(body.password);
        user.email = body.email;
        user.defaultLang = body.defaultLang;
        user.phone = body.phone;
        user.teacher = savedTeacher;
        let savedUser = await this.userService.save(user).catch(reason => {
            savedTeacher.deleteOne(savedTeacher._id)
            throw new BadRequestException('can not create user  ', reason)
        });
        //signed token
        return {
            ...savedUser['_doc'],
            token: this.sign(savedUser),
        };
    }
    async registerParent(body: RegisterParent) {
        //check if user exists;
        if (await this.userService.ifUserExists(body.email, body.phone)) {
            throw new BadRequestException('user already exists');
        }
        let savedSudent = await this.studentService.findByStudentId(body.studentId);

        if (!savedSudent) {
            throw new BadRequestException(`can not find student id ${body.studentId}`);
        }
        //create parent
        let parent = new Parent();
        parent.students = [savedSudent];
        let savedParent = await this.parentService.save(parent);
        //create user
        let user = new User();
        user.userType = UserType.parent;
        user.name = body.name;
        user.fcmTokens = body.fcmToken != null ? [body.fcmToken] : []
        user.password = OverrideUtils.encryptPassword(body.password);
        user.email = body.email;
        user.defaultLang = body.defaultLang;
        user.phone = body.phone;
        user.parent = savedParent;
        let savedUser = await this.userService.save(user).catch(reason => {
            savedParent.deleteOne(savedParent._id)
            throw new BadRequestException('can not create user  ', reason);
        });
        //signed token
        return {
            ...savedUser['_doc'],
            token: this.sign(savedUser),
        };
    }

    async registerStudent(body: RegisterStudent) {
        //check if user exists;
        if (await this.userService.ifUserExists(body.email, body.phone)) {
            throw new BadRequestException('user already exists');
        }
        //create student
        let student = new Student();
        student.city = new City();
        student.grade = new Grade();
        student.stage = new Stage();
        student['city']['_id'] = body.cityId;
        student['grade']['_id'] = body.gradeId;
        student['stage']['_id'] = body.stageId;
        let savedSudent = await this.studentService.save(student);
        //create user
        let user = new User();
        user.userType = UserType.student;
        user.name = body.name;
        user.fcmTokens = body.fcmToken != null ? [body.fcmToken] : []
        user.password = OverrideUtils.encryptPassword(body.password);
        user.email = body.email;
        user.defaultLang = body.defaultLang;
        user.phone = body.phone;
        user.student = savedSudent;
        let savedUser = await this.userService.save(user).catch(reason => {
            savedSudent.deleteOne(savedSudent._id)
            throw new BadRequestException('can not create user  ', reason);
        });
        //signed token
        return {
            ...savedUser['_doc'],
            token: this.sign(savedUser),
        };
    }


}
