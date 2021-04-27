import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
export type ContactUsDocument = ContactUs & Document;
@Schema()
export class ContactUs extends OBaseEntity {
    @ApiProperty()
    @Prop()
    name: string
    @ApiProperty()
    @Prop()
    email : string
    @ApiProperty()
    @Prop()
    phone : string 
    @ApiProperty()
    @Prop()
    subject : string
    @ApiProperty()
    @Prop()
    message : string
}
export const ContactUsSchema = SchemaFactory.createForClass(ContactUs);