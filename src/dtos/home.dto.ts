import { ApiProperty } from "@nestjs/swagger"
import { Banner } from "../Models/banner.model"
import { Course, CourseReview } from "../Models/course.model"
import { Partner } from "../Models/partner.model"
import { Subject } from "../Models/subject.model"
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