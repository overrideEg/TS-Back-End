import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class MobileDTO {

    @ApiProperty()
    @Prop()
    @IsString()
    ext: string;

    @ApiProperty()
    @Prop()
    @IsString()
    mobile: string;

}