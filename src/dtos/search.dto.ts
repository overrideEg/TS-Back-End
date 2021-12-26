import { ApiProperty } from '@nestjs/swagger';
import { Course } from '../models/course/course.model';
import { TeacherProfile } from './teacher-profile.dto';

export class GlobalSearch {
  @ApiProperty({ type: Course, isArray: true })
  courses: Course[];

  @ApiProperty({ type: TeacherProfile, isArray: true })
  teachers: TeacherProfile[];
}

export class GlobalFilter {
  @ApiProperty({ type: Course, isArray: true })
  featuresCourses: Course[];

  @ApiProperty({ type: TeacherProfile, isArray: true })
  topInstructors: TeacherProfile[];

  @ApiProperty({ type: Course, isArray: true })
  allCourses: Course[];
}
