import { forwardRef, Module } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeController } from './notice.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notice, NoticeSchema } from '../../database-models/notice.model';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Notice.name,
        useFactory: async () => {
          const schema = NoticeSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),

    forwardRef(() => UserModule),
  ],
  controllers: [NoticeController],
  providers: [NoticeService],
  exports: [NoticeService],
})
export class NoticeModule {}
