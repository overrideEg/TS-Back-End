import { Banner } from '../models/banner.model';
import { Course } from '../models/course/course.model';
import { CourseReview } from '../models/course/sub-models/course-review.model';
import { Partner } from '../models/partner.model';
import { Subject } from '../models/subject.model';
import { TeacherProfile } from './teacher-profile.dto';
export declare class StudentHome {
    banners: Banner[];
    featuresCourses: Course[];
    startSoon: Course[];
    subjects: Subject[];
    topInstructors: TeacherProfile[];
    partners: Partner[];
    addedRecently: Course[];
}
export declare class TeacherHome {
    todayCourses: Course[];
    noOfCourses: number;
    noOfStudents: number;
    rate: number;
    latestFeedback: CourseReview[];
}
