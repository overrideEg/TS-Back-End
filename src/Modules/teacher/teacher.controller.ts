import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TeacherProfile } from '../../dtos/teacher-profile.dto';
import { Teacher } from '../../Models/teacher.model';
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
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Teacher> {
    return this.service.findOne(id);
  }
  /* GET One Teacher End Point */
  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  getTeacherProfile(@Param('id') id: string): Promise<TeacherProfile> {
    return this.service.getTeacherProfile(id);
  }


  /* PUT  Teacher End Point */
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateTeacher(@Param('id') id: string, @Body() req: Teacher): Promise<any> {
    return this.service.update(id, req);
  }


  /* Delete  Teacher End Point */
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteTeacher(@Param('id') id: string): Promise<any> {
    return this.service.remove(id)
  }

  /* End of Teacher Controller Class 
   
   */
}