import { ApiProperty } from "@nestjs/swagger";
import { Course } from "../models/course/course.model";

export class TeacherProfile {
    @ApiProperty()
    name: string
    @ApiProperty()
    bio: string
    @ApiProperty()
    noOfCourses: number;
    @ApiProperty()
    noOfStudents: number;
    @ApiProperty()
    noOfReviews: number;
    @ApiProperty()
    rate: number;
    @ApiProperty({ type: Course, isArray: true })
    courses: Course[]
    @ApiProperty()
    userId: number;
    @ApiProperty()
    avatar: string;
}