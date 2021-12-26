import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength, MaxLength, IsOptional, IsEnum } from "class-validator";
import { Lang } from "../../../shared/enums/lang.enum";

export class Login {
    @ApiProperty({required:true})
    @IsString()
    username: string;
    
    @ApiProperty({required:true})
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    password: string;
    
    @ApiProperty({required:false})
    @IsString()
    @IsOptional()
    studentId: string;
    
    @ApiProperty({default: Lang.en,enum:[Lang.en,Lang.ar]})
    @IsEnum(Lang)
    defaultLang ?: Lang;
}