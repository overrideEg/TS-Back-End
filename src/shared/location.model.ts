import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsLatitude,
  IsLatLong,
  IsNumber,
  IsString,
} from 'class-validator';

export class LocationModel {
  @ApiProperty()
  @Prop({ default: 'Point', required: true })
  @IsString()
  type: string;
  @ApiProperty({ type: [Number] })
  @Prop({ type: [Number] })
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  coordinates: Array<number>;
}
