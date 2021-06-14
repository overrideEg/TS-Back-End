import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StudentHome, TeacherHome } from '../../dtos/home.dto';
import { JwtAuthGuard } from '../auth/Security/jwt-auth.guard';
import { HomeService } from './home.service';

@ApiTags('Home')
@Controller('Home')
export class HomeController {
  constructor(private readonly homeService: HomeService) { }


  @UseGuards(JwtAuthGuard)
  @Get('student')
  async studentHome(
    @Req() req,
  ): Promise<StudentHome> {
    return this.homeService.getStudentHome(req);
  }


  @UseGuards(JwtAuthGuard)
  @Get('teacher')
  async teacherHome(
    @Req() req,
  ): Promise<TeacherHome> {
    return this.homeService.getTeacherHome(req);
  }
}
