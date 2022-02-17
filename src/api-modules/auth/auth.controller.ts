import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ChangePassword, ResetPassword } from './DTOs/change-password.dto';
import { Login } from './DTOs/login.dto';
import { refreshToken } from './DTOs/refreshToken.dto';
import {
  RegisterAdmin,
  RegisterParent,
  RegisterStudent,
  RegisterTeacher,
} from './DTOs/register.dto';
import { JwtAuthGuard } from '../../security/jwt-auth.guard';
import { ClientGuard } from '../../security/client.guard';

@ApiTags('Auth')
@Controller('Auth')
export class AuthController {
  /* End Points for Auth Created By Override */
  constructor(private service: AuthService) {}

  @Post('/login')
  @UseGuards(ClientGuard)
  public login(@Body() body: Login) {
    return this.service.login(body);
  }
  @Post('/loginByToken')
  @UseGuards(JwtAuthGuard)
  public signInUsingToken(@Req() req) {
    return req.user
  }

  @Put('/activate/:code')
  @UseGuards(JwtAuthGuard)
  public activate(@Req() req: any, @Param('code') code: string) {
    return this.service.activate(req, code);
  }

  @Put('/refreshToken')
  @UseGuards(ClientGuard)
  public refreshToken(@Body() refresh: refreshToken) {
    return this.service.refreshToken(refresh);
  }

  @Put('/requestToken/:macAddress')
  @UseGuards(ClientGuard)
  public requestToken(@Param('macAddress') macAddress: string) {
    return this.service.requestToken(macAddress);
  }
  @Get('/resetPassword/:username')
  @UseGuards(ClientGuard)
  public resetPassword(@Param('username') username: string) {
    return this.service.resetPassword(username);
  }

  @Put('/newPassword')
  @UseGuards(JwtAuthGuard)
  public newPassword(@Req() req, @Body() newPass: ResetPassword) {
    return this.service.newPassword(req, newPass);
  }

  @Put('/changePassword')
  @UseGuards(JwtAuthGuard)
  public changePassword(@Req() req, @Body() changePassword: ChangePassword) {
    return this.service.changePassword(req, changePassword);
  }

  @Get('/resendCode')
  @UseGuards(JwtAuthGuard)
  public resendCode(@Req() req: any) {
    return this.service.resendCode(req);
  }

  @Post('/register/admin')
  @UseGuards(ClientGuard)
  public registerAdmin(@Body() body: RegisterAdmin) {
    return this.service.registerAdmin(body);
  }

  @Post('/register/student')
  @UseGuards(ClientGuard)
  public registerStudent(@Body() body: RegisterStudent) {
    return this.service.registerStudent(body);
  }

  @Post('/register/teacher')
  @UseGuards(ClientGuard)
  public registerTeacher(@Body() body: RegisterTeacher) {
    return this.service.registerTeacher(body);
  }
  @Post('/register/parent')
  @UseGuards(ClientGuard)
  public registerParent(@Body() body: RegisterParent) {
    return this.service.registerParent(body);
  }
}
