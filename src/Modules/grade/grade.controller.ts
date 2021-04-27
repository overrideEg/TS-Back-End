import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Grade } from '../../Models/grade.model';
import { JwtAuthGuard } from '../auth/Security/jwt-auth.guard';
import { GradeService } from './grade.service';


@ApiTags('Grade')
@Controller('Grade')
export class GradeController {

  /* CRUD End Points for Grade Created By Override */


  constructor(private service: GradeService) { }
  /* POST Grade End Point */
  @UseGuards(JwtAuthGuard)
  @Post()
  async saveGrade(@Body() req: Grade): Promise<Grade> {
    return this.service.save(req)
  }


  /* GET All Grades End Point */
  // @UseGuards(JwtAuthGuard)
  @Get('/')
  getAllGrades(): Promise<Grade[]> {
    return this.service.findAll();
  }


  /* GET One Grade End Point */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Grade> {
    return this.service.findOne(id);
  }


  /* PUT  Grade End Point */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateGrade(@Param('id') id: string, @Body() req: Grade): Promise<any> {
    return this.service.update(id, req);
  }


  /* Delete  Grade End Point */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteGrade(@Param('id') id: string): Promise<any> {
    return this.service.remove(id)
  }

  /* End of Grade Controller Class 
   
   */
}