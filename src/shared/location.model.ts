import { Prop } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"

export class LocationModel {

    @ApiProperty()
    @Prop({ default: 'Point', required: true })
    type: string;
    @ApiProperty({ type: [Number] })
    @Prop({ type: [Number] })
    coordinates: Array<number>;

}