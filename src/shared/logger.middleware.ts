import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new Logger()
  use(req: Request, res: Response, next) {
    this.logger.log(`"${req.method}":"${req.originalUrl}" from: "${req.ip}"`)
    next();
  }
}
