import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { SchemaTypes } from 'mongoose';

export class OBaseEntity {
  @ApiProperty({ type: String })
  _id?: any;

  @ApiProperty({ description: 'createdAt', required: true })
  @Prop({})
  createdAt?: number;

  @ApiProperty({ description: 'updatedAt', required: true })
  @Prop({})
  updatedAt?: string;
}
