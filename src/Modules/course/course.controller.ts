import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Course, CourseContent, CourseReview } from '../../Models/course.model';
import { JwtAuthGuard } from '../auth/Security/jwt-auth.guard';
import { CourseService } from './course.service';

@ApiTags('Course')
@Controller('Course')
export class CourseController {

  /* CRUD End Points for Course Created By Override */


  constructor(private service: CourseService) { }
  /* POST Course End Point */
  @UseGuards(JwtAuthGuard)
  @Post('new')
  async saveCourse(@Req() req, @Body() body: Course): Promise<Course> {
    return this.service.newCourse(req, body)
  }
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CourseContent, isArray: true })
  @Post('content/:courseId')
  async addCourseContent(@Req() req, @Body() body: CourseContent[], @Param('courseId') courseId: string): Promise<CourseContent[]> {
    return this.service.addCourseContent(req, courseId, body)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CourseReview })
  @Post('review/:courseId')
  async reviewCourse(@Req() req, @Body() body: CourseReview, @Param('courseId') courseId: string): Promise<CourseReview[]> {
    return this.service.reviewCourse(req, courseId, body)
  }


  @UseGuards(JwtAuthGuard)
  @Get('live/:courseId/:lessonId')
  async startLive(@Req() req, @Param('courseId') courseId: string, @Param('lessonId') lessonId: string): Promise<any> {
    return this.service.startLive(req, courseId, lessonId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('join/:courseId/:lessonId')
  async joinLive(@Req() req, @Param('courseId') courseId: string, @Param('lessonId') lessonId: string): Promise<any> {
    return this.service.joinLive(req, courseId, lessonId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOneCourse(@Req() req, @Param('id') id: string): Promise<Course> {
    return this.service.findOne(req, id)
  }

  
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Req() req, @Body() body: Course, @Param('id') id: string): Promise<Course> {
    return this.service.update(req, id, body)
  }

  @UseGuards(JwtAuthGuard)
  @Get('teacher')
  async teacher(@Req() req): Promise<Course[]> {
    return this.service.getTeacherCourses(req)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Req() req, @Param('id') id: string): Promise<Course> {
    return this.service.delete(req, id)
  }
}