import { Controller, Get, Post, Param, UploadedFile, Req, Res, UploadedFiles, UseGuards, } from '@nestjs/common';
import { FileService } from './file.service';
import { FastifyRequest } from 'fastify'
import { ClientGuard } from '../auth/Security/client.guard';

type Request = FastifyRequest

@Controller('File')
export class FileController {
  constructor(private readonly fileService: FileService) { }


  @UseGuards(ClientGuard)
  @Post('upload')
  uploadFile(@Req() req: Request, @UploadedFile() file) {
    return this.fileService.upload({ request: req, file })
  }

  @UseGuards(ClientGuard)
  @Post('uploadMultiple')
  async uploadMultipleFiles(@Req() req: Request, @UploadedFiles() files: any[]) {

    return await this.fileService.uploadMultiple({ request: req, file: files })
  }

  
  @Get(':id')
  downloadFile(@Param('id') id: string, @Req() request, @Res() response) {
    return this.fileService.download(id, request, response)
  }
}
