import { ApiProperty } from "@nestjs/swagger"
import { IsJWT, IsString } from "class-validator"

export  class refreshToken{
    @ApiProperty({ description: 'Old Token', required: true })
    @IsJWT()
    oldtoken:string
    @ApiProperty({ description: 'Email', required: true })
    @IsString()
    email:string
}