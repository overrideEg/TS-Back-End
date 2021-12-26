import { Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
export declare class LoggerMiddleware implements NestMiddleware {
    logger: Logger;
    use(req: Request, res: Response, next: any): void;
}
