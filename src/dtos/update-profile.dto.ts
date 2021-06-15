import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsOptional } from "class-validator";

export class UpdateProfile {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;
    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email: string;
    @ApiProperty()
    @IsString()
    @IsOptional()
    avatar: string;
    @ApiProperty()
    @IsString()
    @IsOptional()
    bio: string;
    @ApiProperty()
    @IsString()
    @IsOptional()
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
