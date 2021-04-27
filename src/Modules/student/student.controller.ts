import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Student } from '../../Models/student.model';
import { JwtAuthGuard } from '../auth/Security/jwt-auth.guard';
import { Roles } from '../auth/Security/roles.decorator';
import { StudentService } from './student.service';


@ApiTags('Student')
@Controller('Student')
export class StudentController {

  /* CRUD End Points for Student Created By Override */


  constructor(private service: StudentService) { }
  /* POST Student End Point */
 


  /* GET All Students End Point */
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAllStudents(): Promise<Student[]> {
    return this.service.findAll();
  }


  /* GET One Student End Point */
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Student> {
    return this.service.findOne(id);
  }


  /* PUT  Student End Point */
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateStudent(@Param('id') id: string, @Body() req: Student): Promise<any> {
    return this.service.update(id, req);
  }


  /* Delete  Student End Point */
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteStudent(@Param('id') id: string): Promise<any> {
    return this.service.remove(id)
  }

  /* End of Student Controller Class 
   
   */
}