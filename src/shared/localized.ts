import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class Localized {
    @Prop()
    @ApiProperty()
    @IsString()
    ar?: string;
    @ApiProperty()
    @Prop()
    @IsString()
    en?: string;
}