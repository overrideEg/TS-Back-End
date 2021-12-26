import { Course } from '../../models/course/course.model';
import { CourseReview } from '../../models/course/sub-models/course-review.model';
import { Excercice } from '../../models/course/sub-models/excercice.model';
import { CourseService } from './course.service';
export declare class CourseController {
    private service;
    constructor(service: CourseService);
    saveCourse(req: any, body: Course): Promise<Course>;
    approveCourse(req: any, courseId: string): Promise<Course>;
    reviewCourse(req: any, body: CourseReview, courseId: string): Promise<CourseReview[]>;
    applyExcercice(req: any, body: string[], courseId: string, lessonId: string): Promise<Excercice[]>;
    getExcercices(req: any, courseId: string, lessonId: string): Promise<Excercice[]>;
    getOneCourse(req: any, id: string): Promise<Course>;
    update(req: any, body: Course, id: string): Promise<Course>;
    teacher(req: any): Promise<Course[]>;
    getCoursesInDate(req: any, timeStamp: number): Promise<Course[]>;
    myCourses(req: any): Promise<Course[]>;
    delete(req: any, id: string): Promise<Course>;
}
