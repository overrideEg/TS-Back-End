import { ApiProperty } from "@nestjs/swagger";
import { Lang } from "../../../shared/enums/lang.enum";

export class Login {
    @ApiProperty({required:true})
    username: string;
    
    @ApiProperty({required:true})
    password: string;
    
    @ApiProperty({required:false})
    studentId: string;
    
    @ApiProperty({default: Lang.en,enum:[Lang.en,Lang.ar]})
    defaultLang ?: Lang;
}