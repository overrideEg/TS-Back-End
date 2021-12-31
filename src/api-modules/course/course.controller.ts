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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Course } from '../../database-models/course/course.model';
import { CourseContent } from '../../database-models/course/sub-models/course-content.model';
import { CourseReview } from '../../database-models/course/sub-models/course-review.model';
import { Excercice } from '../../database-models/course/sub-models/excercice.model';
import { StartLiveDTO } from '../../dtos/start-live.dto';
import { JwtAuthGuard } from '../../security/jwt-auth.guard';
import { CourseService } from './course.service';

@ApiTags('Course')
@Controller('Course')
export class CourseController {
  /* CRUD End Points for Course Created By Override */

  constructor(private service: CourseService) { }


  @UseGuards(JwtAuthGuard)
  @Post('startLive')
  async startLive(@Req() req, @Body() body: StartLiveDTO): Promise<any> {
    let startedClass = await this.service.startLive(req, body)
    return startedClass
  }



  @UseGuards(JwtAuthGuard)
  @Post('join')
  async join(@Req() req, @Body() body: StartLiveDTO): Promise<any> {    
    let startedClass = await this.service.joinLive(req, body)
    return startedClass
  }

  @UseGuards(JwtAuthGuard)
  @Post('endLive')
  async endLive(@Req() req, @Body() body: StartLiveDTO): Promise<any> {
 
    let startedClass = await this.service.endLive(req, body)
    return startedClass
  }

  @UseGuards(JwtAuthGuard)
  @Post('leave')
  async leave(@Req() req, @Body() body: StartLiveDTO): Promise<any> {
   
    let startedClass = await this.service.leave(req, body)
    return startedClass
  }
  
  /* POST Course End Point */
  @UseGuards(JwtAuthGuard)
  @Post('new')
  async saveCourse(@Req() req, @Body() body: Course): Promise<Course> {
    return this.service.newCourse(req, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put('approve/:courseId')
  async approveCourse(
    @Req() req,
    @Param('courseId') courseId: string,
  ): Promise<Course> {
    return this.service.approveCourse(req, courseId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CourseReview })
  @Post('review/:courseId')
  async reviewCourse(
    @Req() req,
    @Body() body: CourseReview,
    @Param('courseId') courseId: string,
  ): Promise<CourseReview[]> {
    return this.service.reviewCourse(req, courseId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('excercice/:courseId/:lessonId')
  async applyExcercice(
    @Req() req,
    @Body() body: string[],
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
  ): Promise<Excercice[]> {
    return this.service.applyExcercice(req, courseId, lessonId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('excercice/:courseId/:lessonId')
  async getExcercices(
    @Req() req,
    @Param('courseId') courseId: string,
    @Param('lessonId') lessonId: string,
  ): Promise<Excercice[]> {
    return this.service.getExcercices(req, courseId, lessonId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOneCourse(@Req() req, @Param('id') id: string): Promise<Course> {
    return this.service.findOne(req, id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Req() req,
    @Body() body: Course,
    @Param('id') id: string,
  ): Promise<Course> {
    return this.service.update(req, id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('teacher')
  async teacher(@Req() req): Promise<Course[]> {
    return this.service.getTeacherCourses(req);
  }
  @UseGuards(JwtAuthGuard)
  @Get('byDate')
  async getCoursesInDate(
    @Req() req,
    @Query('timeStamp') timeStamp: number,
  ): Promise<Course[]> {
    return this.service.getCoursesInDate(req, +timeStamp);
  }

  @UseGuards(JwtAuthGuard)
  @Get('student')
  async myCourses(@Req() req): Promise<Course[]> {
    return this.service.getStudentCourses(req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Req() req, @Param('id') id: string): Promise<Course> {
    return this.service.delete(req, id);
  }



}

