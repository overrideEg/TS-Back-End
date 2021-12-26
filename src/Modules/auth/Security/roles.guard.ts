import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserType } from '../../../models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const authHeader: string = request.headers.authorization;
    const Token = authHeader.substring(7);
    const user: any = this.jwtService.decode(Token);
    return matchRoles(roles, user.userType);
  }
}
function matchRoles(roles: string[], userType: UserType) {
  const role = roles.find((roles) => roles === userType.toString());
  return role && role !== null;
}
