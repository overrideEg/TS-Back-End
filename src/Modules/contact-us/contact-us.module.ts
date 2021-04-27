import { Module } from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { ContactUsController } from './contact-us.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactUs, ContactUsSchema } from '../../Models/contact-us.model';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: ContactUs.name,schema: ContactUsSchema
      }
    ])
  ],
  controllers: [ContactUsController],
  providers: [ContactUsService]
})
export class ContactUsModule {}
