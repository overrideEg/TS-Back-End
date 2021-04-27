import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception['message'];



    response.status(status)
    response.headers({
      'Content-Type': 'application/json'

    })
 
    const res = {
      statusCode: status,
      message: exception['response'] ? exception['response']['message'].toString() : message,
      timestamp: new Date().toISOString(),
      path: request.url,
    }
    console.error(res)
    response.send(res)
  }
}
 