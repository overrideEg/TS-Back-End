import { Status } from '../../enums/status.enum';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { profile } from 'console';
import { TeacherProfile } from '../../dtos/teacher-profile.dto';
import { UpdateProfile } from '../../dtos/update-profile.dto';
import { TransactionType } from '../../enums/wallet.enum';
import { BankAccount } from '../../database-models/bank-account.model';
import { StudentReview } from '../../database-models/student-review.model';
import { User } from '../../database-models/user.model';
import { JwtAuthGuard } from '../../security/jwt-auth.guard';
import { UserService } from './user.service';
import { UserType } from '../../enums/user-type.enum';

@ApiTags('User')
@Controller('User')
export class UserController {
  /* CRUD End Points for User Created By Override */

  constructor(private service: UserService) {}
  /* POST User End Point */
  @UseGuards(JwtAuthGuard)
  @Post()
  async saveUser(@Body() req: User): Promise<User> {
    return this.service.save(req);
  }

  /* GET All Users End Point */
  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @ApiQuery({
    name: 'userType',
    enum: [UserType.admin, UserType.parent, UserType.student, UserType.teacher],
    required: false,
  })
  getAllUsers(@Query('userType') userType: string): Promise<User[]> {
    return this.service.findAll(userType);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getMyProfile(@Req() req): Promise<User> {
    return this.service.myProfile(req);
  }

  /* GET One Teacher End Point */
  @UseGuards(JwtAuthGuard)
  @Get('teacher/:id')
  getTeacherProfile(@Param('id') id: string): Promise<TeacherProfile> {
    return this.service.getTeacherProfile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('account')
  getBankAccounts(@Req() req) {
    return this.service.getBankAccounts(req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('wallet')
  @ApiQuery({ name: 'type', enum: [TransactionType.in, TransactionType.out] })
  @ApiQuery({ name: 'status', enum: [Status.approved, Status.pending] })
  getWallets(@Query('type') type: string, @Query('status') status: string) {
    return this.service.getWallets(
      type ? TransactionType[type] : null,
      status ? Status[status] : null,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post('reviewStudent/:studentId/:courseId')
  @ApiBody({ type: () => StudentReview })
  ReviewStudent(
    @Req() req,
    @Param('studentId') studentId: string,
    @Param('courseId') courseId: string,
    @Body() body: StudentReview,
  ) {
    return this.service.reviewStudent(req, studentId, courseId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('review/:studentId/:subjectId')
  @ApiBody({ type: () => StudentReview })
  studentReview(
    @Req() req,
    @Param('studentId') studentId: string,
    @Param('subjectId') subjectId: string,
  ) {
    return this.service.getStudentReviews(req, studentId, subjectId);
  }

  /* GET One User End Point */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.service.findOne(id);
  }

  /* PUT  User End Point */
  @UseGuards(JwtAuthGuard)
  @Put('teacherStatus/:id')
  approveTeacher(@Param('id') id: string): Promise<any> {
    return this.service.teacherStatus(id);
  }
  /* PUT  User End Point */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() req: User): Promise<any> {
    return this.service.update(id, req);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/profile')
  updateProfile(@Req() req, @Body() profile: UpdateProfile): Promise<User> {
    return this.service.updateProfile(req, profile);
  }

  /* Delete  User End Point */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string): Promise<any> {
    return this.service.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('account')
  addBankAcount(@Req() req, @Body() body: BankAccount) {
    return this.service.addBankAccount(req, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('Withdraw/:accountId/:amount')
  withdrawCash(
    @Req() req,
    @Param('accountId') accountId: string,
    @Param('amount') amount: number,
  ) {
    return this.service.withDrawCash(req, accountId, +amount);
  }

  @UseGuards(JwtAuthGuard)
  @Put('wallet/approve/:teacherId/:walletId')
  approveTransaction(
    @Param('teacherId') teacherId: string,
    @Param('walletId') walletId: string,
  ) {
    return this.service.approveTransaction(teacherId, walletId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('account/:accountId')
  deleteBankAcount(@Req() req, @Param('accountId') accountId: string) {
    return this.service.deleteBankAccount(req, accountId);
  }
  /* End of User Controller Class 
   
   */
}
