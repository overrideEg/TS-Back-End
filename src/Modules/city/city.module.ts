import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { City, CitySchema } from '../../Models/city.model';

@Module({
  imports:[
  
    MongooseModule.forFeatureAsync([
      {
        name: City.name,
        useFactory: () => {
          const schema = CitySchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [CityController],
  providers: [CityService],
  exports: [CityService],
})
export class CityModule {}
