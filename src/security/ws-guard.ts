import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ThrottlerGuard } from '@nestjs/throttler';
import { WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { UserService } from '../api-modules/user/user.service';
import { AuthService } from '../api-modules/auth/auth.service';
import { jwtConstants } from './constants';

@Injectable()
export class WsGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    let bearerToken = context.args[0].request.headers.authorization as string;
    try {
      return new Promise((resolve, reject) => {
        return this.authService
          .getUserFromAuthenticationToken(bearerToken)
          .then((user) => {
            if (user) {
              resolve(user);
            } else {
              reject(false);
            }
          });
      });
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}
