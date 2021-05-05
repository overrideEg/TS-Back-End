import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';
import { ParentController } from './parent.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Parent, ParentSchema } from '../../Models/parent.model';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    
    MongooseModule.forFeatureAsync([
      {
        name: Parent.name,
        useFactory: () => {
          const schema = ParentSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
    UserModule
  ],
  controllers: [ParentController],
  providers: [ParentService],
  exports: [ParentService],
})
export class ParentModule { }
