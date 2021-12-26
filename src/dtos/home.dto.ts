import { ApiProperty } from "@nestjs/swagger"
import { Banner } from "../models/banner.model"
import { Course } from "../models/course/course.model"
import { CourseReview } from "../models/course/sub-models/course-review.model"
import { Partner } from "../models/partner.model"
import { Subject } from "../models/subject.model"
import { TeacherProfile } from "./teacher-profile.dto"

export class StudentHome {

    @ApiProperty({ type: Banner, isArray: true })
    banners: Banner[]

    @ApiProperty({ type: Course, isArray: true })
    featuresCourses: Course[]

    @ApiProperty({ type: Course, isArray: true })
    startSoon: Course[]

    @ApiProperty({ type: Subject, isArray: true })
    subjects: Subject[]

    @ApiProperty({ type: TeacherProfile, isArray: true })
    topInstructors: TeacherProfile[]

    @ApiProperty({ type: Partner, isArray: true })
    partners: Partner[];

    @ApiProperty({ type: Course, isArray: true })
    addedRecently: Course[]
}



export class TeacherHome {

  
    @ApiProperty({ type: Course, isArray: true })
    todayCourses: Course[]

    @ApiProperty()
    noOfCourses: number;

    @ApiProperty()
    noOfStudents: number;

    @ApiProperty()
    rate: number;

    @ApiProperty({ type: CourseReview, isArray: true })
    latestFeedback: CourseReview[]

  
}