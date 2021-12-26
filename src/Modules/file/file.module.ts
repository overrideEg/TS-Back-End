import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { OFileSchema } from './entities/file.entity';

@Module({
  imports: [
    //   MongooseModule.forFeature([
    //   { name: 'fs.files', schema: OFileSchema }
    // ]
    // ),
    MongooseModule.forFeatureAsync([
      {
        name: 'fs.files',
        useFactory: () => {
          const schema = OFileSchema;
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
