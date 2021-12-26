import { CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
export declare class WsGuard implements CanActivate {
    private authService;
    constructor(authService: AuthService);
    canActivate(context: any): boolean | any | Promise<boolean | any> | Observable<boolean | any>;
}
