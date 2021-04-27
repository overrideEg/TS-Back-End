import { Prop } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class LocationModel {

    @ApiProperty()
    @Prop({ default: 'Point', required: true })
    @IsString()
    type: string;
    @ApiProperty({ type: [Number] })
    @Prop({ type: [Number] })
    @IsNumber({}, { each: true })
    coordinates: Array<number>;

}