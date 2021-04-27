import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";

export class Localized {
    @Prop()
    @ApiProperty()
    ar?: string;
    @ApiProperty()
    @Prop()
    en?: string;
}