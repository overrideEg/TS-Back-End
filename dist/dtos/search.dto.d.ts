import { Course } from '../models/course/course.model';
import { TeacherProfile } from './teacher-profile.dto';
export declare class GlobalSearch {
    courses: Course[];
    teachers: TeacherProfile[];
}
export declare class GlobalFilter {
    featuresCourses: Course[];
    topInstructors: TeacherProfile[];
    allCourses: Course[];
}
