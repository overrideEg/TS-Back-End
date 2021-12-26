import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
export type ContactUsDocument = ContactUs & Document;
@Schema()
export class ContactUs extends OBaseEntity {
  @ApiProperty()
  @Prop()
  @IsString()
  name: string;
  @ApiProperty()
  @Prop()
  @IsEmail()
  email: string;
  @ApiProperty()
  @Prop()
  @IsString()
  phone: string;
  @ApiProperty()
  @Prop()
  @IsString()
  subject: string;
  @ApiProperty()
  @Prop()
  @IsString()
  message: string;
}
export const ContactUsSchema = SchemaFactory.createForClass(ContactUs);
