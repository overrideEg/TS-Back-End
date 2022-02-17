import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Login } from './DTOs/login.dto';
import { JwtService } from '@nestjs/jwt';
import {
  RegisterAdmin,
  RegisterParent,
  RegisterStudent,
  RegisterTeacher,
} from './DTOs/register.dto';
import { User } from '../../database-models/user.model';
import { OverrideUtils } from '../../shared/override-utils';
import { City } from '../../database-models/city.model';
import { Grade } from '../../database-models/grade.model';
import { Stage } from '../../database-models/stage.model';
import { refreshToken } from './DTOs/refreshToken.dto';
import { Lang } from '../../shared/enums/lang.enum';
import { ChangePassword, ResetPassword } from './DTOs/change-password.dto';
import { jwtConstants, sms } from '../../security/constants';
import { HttpService } from '@nestjs/axios';
import { UserType } from '../../enums/user-type.enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private httpService: HttpService,
  ) {}

  public async getUserFromAuthenticationToken(token: string) {
    token = token.substr(7);
    try {
      const payload = this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      if (payload.id) {
        return this.userService.findOne(payload.id);
      }
    } catch (exception) {
      throw new Error('token is invalid');
    }
  }
  sign(user: User) {
    return this.jwtService.sign({
      _id: user['_id'],
      username: user['username'],
      phone: user['phone'],
      userType: user['userType'],
      defaultLang: user['defaultLang'],
    });
  }

  requestToken(macAddress: string) {
    return {
      token: this.jwtService.sign(
        {
          _id: null,
          email: null,
          phone: null,
          userType: UserType.student,
          macAddress: macAddress,
          defaultLang: Lang.ar,
        },
        { expiresIn: '1h' },
      ),
    };
  }

  async changePassword(req: any, body: ChangePassword) {
    let user = await this.userService.findOne(req.user._id);
    if (!user) throw new UnauthorizedException('check your credintials');
    if (OverrideUtils.dycreptPassword(user.password) !== body.oldPassword)
      throw new UnauthorizedException('check your credintials');

    user.password = OverrideUtils.encryptPassword(body.newPassword);
    user.isActive = true;
    user.tempCode = '';
    user = await this.userService.update(user['_id'], user);

    return {
      ...user['_doc'],
      token: this.sign(user),
    };
  }
  async newPassword(req, body: ResetPassword) {
    let user = await this.userService.findOne(req.user._id);
    if (!user) throw new UnauthorizedException('check your credintials');

    if (!user.isActive)
      user.password = OverrideUtils.encryptPassword(body.newPassword);
    user.isActive = true;
    user.tempCode = '';
    user = await this.userService.update(user['_id'], user);
    return {
      ...user['_doc'],
      token: this.sign(user),
    };
  }

  async resetPassword(username: string) {
    let user;
    user = await this.userService.login(username);
    if (!user) throw new UnauthorizedException('check your credintials');
    user.tempCode = '00000';
    await this.sendOTPSMS(user.phone, user.tempCode);
    user.isActive = false;
    user = await this.userService.update(user['_id'], user);

    delete user.teacher?.user?.teacher;
    delete user.student?.user?.student;
    return {
      ...user['_doc'],
      token: this.sign(user),
    };
  }
  async refreshToken(refresh: refreshToken) {
    const decodedToken = this.jwtService.decode(refresh.oldtoken) as any;
    if (
      decodedToken.email == refresh.email &&
      decodedToken.exp <= new Date().getTime()
    ) {
      const user = await this.userService.login(refresh.email, Lang.en);

      return {
        ...user['_doc'],
        token: this.sign(user),
      };
    } else {
      throw new UnauthorizedException('Can Not Refresh Token');
    }
  }
  async resendCode(req: any) {
    let user = await this.userService.findOne(req.user._id);
    if (!user) throw new UnauthorizedException('check your credintials');
    user.tempCode = '54321';
    await this.sendOTPSMS(user.phone, user.tempCode);
    user.isActive = false;
    user = await this.userService.update(user['_id'], user);
    return {
      ...user['_doc'],
      token: this.sign(user),
    };
  }

  async sendOTPSMS(number: string, tempCode: string) {
    const msg = `${tempCode} is your verification code for TS-Academy App`;
    const baseURL = `https://apps.gateway.sa/vendorsms/pushsms.aspx?user=${sms.user}&password=${sms.password}&msisdn=${number}&sid=${sms.sid}&fl=${sms.fl}&msg=${msg}`;
    await this.httpService.get(baseURL).toPromise();
  }
  async activate(req: any, code: string) {
    let user = await this.userService.findOne(req.user._id);
    if (!user) throw new UnauthorizedException('check your credintials');
    if (user.isActive === false && user.tempCode !== code)
      throw new UnauthorizedException('invalid code');
    user.isActive = true;
    user.tempCode = '';
    user = await this.userService.update(user['_id'], user);
    return {
      ...user['_doc'],
      token: this.sign(user),
    };
  }
  async signInUsingToken(reqUser){
    if (reqUser.macAddress){
      return {
        ...reqUser,
        token : this.requestToken(reqUser.macAddress)
      }
    }
    let user = await this.userService.login(reqUser.email??reqUser.phone, reqUser.defaultLang);
    if (!user){
      throw new UnauthorizedException('invalid token')
    }
    return {
      ...user['_doc'],
      token: this.sign(user),
    };
  }
  async login(body: Login) {
    let user = await this.userService.login(body.username, body.defaultLang);
    if (!user) throw new UnauthorizedException('user not found');
    // if (!user.isActive)
    //     throw new UnauthorizedException('please activate your account');
    if (OverrideUtils.dycreptPassword(user.password) !== body.password)
      throw new UnauthorizedException('check your credintials');

    if (user.userType === UserType.parent) {
      if (!body.studentId)
        throw new UnauthorizedException('please enter student id');

      let student = await this.userService.UserModel.findOne({
        studentId: body.studentId,
      }).exec();
      if (!student)
        throw new UnauthorizedException('please enter correct student id');

      if (!user.students.find((st) => st === student['_id'])) {
        user.students.push(student);
        await this.userService.UserModel.updateOne({ _id: user['_id'] }, user);
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
    user.password = OverrideUtils.encryptPassword(body.password);
    user.email = body.email;
    user.defaultLang = body.defaultLang;
    user.phone = body.phone;
    user.isActive = true;
    let savedUser = await this.userService.save(user).catch((reason) => {
      throw new BadRequestException('can not create user  ', reason);
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

    //create user
    let user = new User();
    user.userType = UserType.teacher;
    user.name = body.name;
    user.password = OverrideUtils.encryptPassword(body.password);
    user.email = body.email;
    user.defaultLang = body.defaultLang;
    user.phone = body.phone;

    user.city = new City();

    user.additionalPhone = body.additionalPhone;
    user.city['_id'] = body.cityId;
    user.coverletter = body.coverLetter;
    user.resume = body.resume;
    user.tempCode = '12345';
    await this.sendOTPSMS(user.phone, user.tempCode);
    let savedUser = await this.userService.save(user).catch((reason) => {
      throw new BadRequestException('can not create user  ', reason);
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
    let savedSudent = await this.userService.UserModel.findOne({
      studentId: body.studentId,
    }).exec();

    if (!savedSudent) {
      throw new BadRequestException(
        `can not find student id ${body.studentId}`,
      );
    }
    //create parent
    //create user
    let user = new User();
    user.userType = UserType.parent;
    user.name = body.name;
    user.password = OverrideUtils.encryptPassword(body.password);
    user.email = body.email;
    user.defaultLang = body.defaultLang;
    user.phone = body.phone;
    user.students = [savedSudent];
    user.tempCode = '12345';
    await this.sendOTPSMS(user.phone, user.tempCode);
    let savedUser = await this.userService.save(user).catch((reason) => {
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

    //create user
    let user = new User();
    user.userType = UserType.student;
    user.name = body.name;
    user.password = OverrideUtils.encryptPassword(body.password);
    user.email = body.email;
    user.defaultLang = body.defaultLang;
    user.phone = body.phone;
    user.city = new City();
    user.grade = new Grade();
    user.stage = new Stage();
    user['city']['_id'] = body.cityId;
    user['grade']['_id'] = body.gradeId;
    user['stage']['_id'] = body.stageId;
    user.tempCode = '12345';
    await this.sendOTPSMS(user.phone, user.tempCode);

    let savedUser = await this.userService.save(user);
    //signed token

    return {
      ...savedUser['_doc'],
      token: this.sign(savedUser),
    };
  }
}
