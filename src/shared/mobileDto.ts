import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class MobileDTO {

    @ApiProperty()
    @Prop()
  
    ext: string;

    @ApiProperty()
    @Prop()
  
    mobile: string;

}