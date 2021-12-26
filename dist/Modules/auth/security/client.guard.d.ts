import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
declare const ClientGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class ClientGuard extends ClientGuard_base implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
    validateRequest(req: Request): boolean;
}
export {};
