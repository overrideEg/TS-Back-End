import { Model } from 'mongoose';
import { Course, CourseDocument } from '../../models/course/course.model';
import { CourseReview, CourseReviewDocument } from '../../models/course/sub-models/course-review.model';
import { Excercice } from '../../models/course/sub-models/excercice.model';
import { CheckoutService } from '../checkout/checkout.service';
import { UserService } from '../user/user.service';
export declare class CourseService {
    CourseModel: Model<CourseDocument>;
    reviewModel: Model<CourseReviewDocument>;
    private userService;
    private checkoutService;
    constructor(CourseModel: Model<CourseDocument>, reviewModel: Model<CourseReviewDocument>, userService: UserService, checkoutService: CheckoutService);
    newCourse(req: any, body: Course): Promise<Course | PromiseLike<Course>>;
    approveCourse(req: any, courseId: string): Promise<Course | PromiseLike<Course>>;
    update(req: any, id: string, body: Course): Promise<Course | PromiseLike<Course>>;
    delete(req: any, id: string): Promise<Course | PromiseLike<Course>>;
    reviewCourse(req: any, courseId: string, body: CourseReview): Promise<CourseReview[] | PromiseLike<CourseReview[]>>;
    findOne(req: any, id: string): Promise<Course | PromiseLike<Course>>;
    getTeacherCourses(req: any): Promise<Course[] | PromiseLike<Course[]>>;
    getCoursesInDate(req: any, timeStamp: number): Promise<Course[] | PromiseLike<Course[]>>;
    getStudentCourses(req: any): Promise<Course[] | PromiseLike<Course[]>>;
    applyExcercice(req: any, courseId: string, lessonId: string, body: string[]): Promise<Excercice[] | PromiseLike<Excercice[]>>;
    getExcercices(req: any, courseId: string, lessonId: string): Promise<Excercice[] | PromiseLike<Excercice[]>>;
    getReviwsForTeacher(teacher: any): Promise<CourseReview[] | PromiseLike<CourseReview[]>>;
}
