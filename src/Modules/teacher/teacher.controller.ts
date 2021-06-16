import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeacherProfile } from '../../dtos/teacher-profile.dto';
import { BankAccount, Teacher } from '../../Models/teacher.model';
import { JwtAuthGuard } from '../auth/Security/jwt-auth.guard';
import { Roles } from '../auth/Security/roles.decorator';
import { TeacherService } from './teacher.service';

@ApiTags('Teacher')
@Controller('Teacher')
export class TeacherController {

  /* CRUD End Points for Teacher Created By Override */


  constructor(private service: TeacherService) { }
  /* POST Teacher End Point */


  /* GET All Teachers End Point */
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAllTeachers(): Promise<Teacher[]> {
    return this.service.findAll();
  }

  /* GET One Teacher End Point */
  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  getTeacherProfile(@Param('id') id: string): Promise<TeacherProfile> {
    return this.service.getTeacherProfile(id);
  }


  @UseGuards(JwtAuthGuard)
  @Post('account')
  addBankAcount(@Req() req, @Body() body: BankAccount) {
    return this.service.addBankAccount(req,body)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('account/:accountId')
  deleteBankAcount(@Req() req, @Param('accountId') accountId: string) {
    return this.service.deleteBankAccount(req,accountId)
  }

}