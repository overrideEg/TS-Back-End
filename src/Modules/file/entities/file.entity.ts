import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OBaseEntity } from '../../../shared/base-entity';
export type OFileDocument = OFile & Document;
@Schema()
export class OFile extends OBaseEntity {
    @Prop()
    name: string;
    @Prop()
    length: number
    @Prop()
    chunkSize: number
    @Prop()
    uploadDate: string
    @Prop()
    filename: string
    @Prop()
    md5: string
    @Prop()
    contentType: string
}
export const OFileSchema = SchemaFactory.createForClass(OFile);