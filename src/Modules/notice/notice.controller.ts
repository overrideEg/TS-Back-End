import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Req,
} from '@nestjs/common';
import { NoticeService } from './notice.service';
import { ApiTags } from '@nestjs/swagger';
import { Notice } from '../../models/notice.model';
import { JwtAuthGuard } from '../auth/security/jwt-auth.guard';

@ApiTags('Notice')
@Controller('Notice')
export class NoticeController {
  /* CRUD End Points for Notice Created By Override */

  constructor(private service: NoticeService) {}
  /* POST Notice End Point */
  @UseGuards(JwtAuthGuard)
  @Post('send')
  async SendNotification(@Body() req: Notice): Promise<Notice> {
    return this.service.sendNotification(req);
  }

  /* GET All Notices End Point */
  @UseGuards(JwtAuthGuard)
  @Get('/my')
  getAllNotices(@Req() req): Promise<Notice[]> {
    return this.service.findAll(req);
  }

  /* End of Notice Controller Class 
   
   */
}
