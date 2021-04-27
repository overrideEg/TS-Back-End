import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Login } from './DTOs/login.dto';
import { refreshToken } from './DTOs/refreshToken.dto';
import { RegisterAdmin, RegisterParent, RegisterStudent, RegisterTeacher } from './DTOs/register.dto';
import { ClientGuard } from './Security/client.guard';
import { JwtAuthGuard } from './Security/jwt-auth.guard';


@ApiTags('Auth')
@Controller('Auth')
export class AuthController {

  /* End Points for Auth Created By Override */
  constructor(private service: AuthService) { }

  @Post('/login')
  @UseGuards(ClientGuard)
  public login(@Body() body: Login) {
    return this.service.login(body);
  }

  @Put('/activate/:code')
  @UseGuards(JwtAuthGuard)
  public activate(@Req() req: any,@Param('code') code: string) {
    return this.service.activate(req,code);
  }

  @Put('/refreshToken')
  @UseGuards(ClientGuard)
  public refreshToken(@Body() refresh: refreshToken) {
    return this.service.refreshToken(refresh);
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