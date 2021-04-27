import { Prop } from "@nestjs/mongoose";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { City } from "../../../Models/city.model";
import { Lang } from "../../../shared/enums/lang.enum";

export class RegisterAdmin {
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    fcmToken: string;
    @ApiProperty({ default: Lang.en, enum: [Lang.en, Lang.ar] })
    defaultLang?: Lang;
}
export class RegisterStudent extends PartialType(RegisterAdmin) {
    @ApiProperty()
    cityId : string
    @ApiProperty()
    gradeId : string
    @ApiProperty()
    stageId : string
}
export class RegisterTeacher extends PartialType(RegisterAdmin) {
    @ApiProperty()
    cityId : string
    @ApiProperty()
    additionalPhone: string;
    @ApiProperty()
    resume : string
    @ApiProperty()
    coverLetter: string
}
export class RegisterParent extends PartialType(RegisterAdmin) {
    @ApiProperty()
    studentId: string;
   
}