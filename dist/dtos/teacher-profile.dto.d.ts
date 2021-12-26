import { Course } from '../models/course/course.model';
export declare class TeacherProfile {
    name: string;
    bio: string;
    noOfCourses: number;
    noOfStudents: number;
    noOfReviews: number;
    rate: number;
    courses: Course[];
    userId: number;
    avatar: string;
}
