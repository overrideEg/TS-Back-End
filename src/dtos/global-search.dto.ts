import { ApiProperty } from "@nestjs/swagger";
import { Course } from "../Models/course.model";
import { Teacher } from "../Models/teacher.model";
import { TeacherProfile } from "./teacher-profile.dto";

export class GloalSearch{
    @ApiProperty({ type: Course, isArray: true })
    courses: Course[]

    @ApiProperty({ type: TeacherProfile, isArray: true })
    teachers: TeacherProfile[]
}