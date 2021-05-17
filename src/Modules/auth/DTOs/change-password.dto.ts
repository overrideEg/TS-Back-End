import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class ChangePassword {
    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    oldPassword: string;
    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    newPassword: string;
}

export class ResetPassword {
    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(16)
    newPassword: string;
}