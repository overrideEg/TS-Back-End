import { Module } from '@nestjs/common';
import { OurContactsService } from './our-contacts.service';
import { OurContactsController } from './our-contacts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OurContacts, OurContactsSchema } from '../../Models/our-contacts';

@Module({
  imports:[
    MongooseModule.forFeature([
      {name: OurContacts.name,schema: OurContactsSchema}
    ])
  ],
  controllers: [OurContactsController],
  providers: [OurContactsService]
})
export class OurContactsModule {}
