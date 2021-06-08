import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsOptional } from "class-validator";

export class UpdateProfile {
    @IsString()
    @ApiProperty()
    name: string;
    @ApiProperty()
    @IsEmail()
    email: string;
    @ApiProperty()
    @IsString()
    @IsOptional()
    bio: string;
    @ApiProperty()
    @IsString()
    cityId : string
    @ApiProperty()
    @IsString()
     @IsOptional()
    gradeId : string
    @ApiProperty()
    @IsString()
    @IsOptional()
    stageId : string
  
}
