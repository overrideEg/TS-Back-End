import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { TeacherProfile } from '../../dtos/teacher-profile.dto';
import { TransactionStatus, TransactionType } from '../../enums/wallet.enum';
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
    return this.service.addBankAccount(req, body)
  }

  @UseGuards(JwtAuthGuard)
  @Get('account')
  getBankAccounts(@Req() req) {
    return this.service.getBankAccounts(req)
  }
  @UseGuards(JwtAuthGuard)
  @Post('Withdraw/:accountId/:amount')
  withdrawCash(@Req() req, @Param('accountId') accountId: string, @Param('amount') amount: number) {
    return this.service.withDrawCash(req, accountId, +amount)
  }


  @UseGuards(JwtAuthGuard)
  @Get('wallet')
  @ApiQuery({ name: 'type', enum: [TransactionType.in, TransactionType.out] })
  @ApiQuery({ name: 'status', enum: [TransactionStatus.approved, TransactionStatus.pending] })
  getWallets(@Query('type') type: string, @Query('status') status: string) {
    return this.service.getWallets(type ? TransactionType[type]: TransactionType.out, status ?  TransactionStatus[status] : TransactionStatus.pending);
  }


  @UseGuards(JwtAuthGuard)
  @Put('wallet/approve/:teacherId/:walletId')
  approveTransaction( @Param('teacherId') teacherId: string, @Param('walletId') walletId: string) {
    return this.service.approveTransaction(teacherId,walletId)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('account/:accountId')
  deleteBankAcount(@Req() req, @Param('accountId') accountId: string) {
    return this.service.deleteBankAccount(req, accountId)
  }

}