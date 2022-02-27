import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { SettingService } from './setting.service';
import { Setting } from '../../database-models/setting.model';
import { JwtAuthGuard } from '../../security/jwt-auth.guard';
import { ClientGuard } from '../../security/client.guard';

@ApiTags('Setting')
@Controller('Setting')
export class SettingController {
  constructor(private service: SettingService) {}
  /* POST Setting End Point */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async saveHome(@Body() req: Setting): Promise<Setting> {
    return this.service.save(req);
  }

  /* GET  Settings End Point */
  // @ApiBearerAuth()
  // @UseGuards(ClientGuard)
  @Get()
  getHome(): Promise<Setting> {
    return this.service.getCurrentSettings();
  }
}
