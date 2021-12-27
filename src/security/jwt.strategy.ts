import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../api-modules/user/user.service';
import { UserType } from 'src/enums/user-type.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    if (payload.macAddress != null) return payload;
    const user = await this.userService.validate(payload);

    if (user) {
      if (user.userType === UserType.teacher && !user.teacherApproved)
        throw new UnauthorizedException(
          'please wait until activate your account',
        );
      return payload;
    } else throw new UnauthorizedException('User Not Exists');
  }
}
