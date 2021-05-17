import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { OBaseEntity } from '../shared/base-entity';
import { ApiProperty } from '@nestjs/swagger';
import { Localized } from '../shared/localized';
import { IsString, IsUrl, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
export type OurContactsDocument = OurContacts & Document;
@Schema()
export class OurContacts extends OBaseEntity {
    @ApiProperty({type:  Localized , description: 'about', required: true })
    @Prop({ type: Localized })
    @ValidateNested()
    @Type(()=>Localized)
    about?: Localized;

    @ApiProperty({type:  Localized , description: 'terms', required: true })
    @Prop({ type: Localized })
    @ValidateNested()
    @Type(()=>Localized)
    terms?: Localized;

    @ApiProperty({type:  Localized , description: 'privacy', required: true })
    @Prop({ type: Localized })
    @ValidateNested()
    @Type(()=>Localized)
    privacy?: Localized;

    @ApiProperty({default:'', description: 'facebook', required: true })
    @Prop({default:''})
    @IsUrl()
    facebook?: string;
    
    @ApiProperty({default:'', description: 'twitter', required: true })
    @Prop({default:''})
    @IsUrl()
    twitter?: string;
    
    @ApiProperty({default:'', description: 'snapchat', required: true })
    @Prop({default:''})
    @IsUrl()
    snapchat?: string;

    @ApiProperty({default:'', description: 'instagram', required: true })
    @Prop({default:''})
    @IsUrl()
    instagram?: string;
    
    @ApiProperty({default:'', description: 'whatsapp', required: true })
    @Prop({default:''})
    @IsUrl()
    whatsapp?: string;

    @ApiProperty({default:'', description: 'phone number', required: true })
    @Prop({default:''})
    @IsString()
    phoneNumber?: string;
}
export const OurContactsSchema = SchemaFactory.createForClass(OurContacts);