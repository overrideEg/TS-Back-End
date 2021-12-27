import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Banner } from '../../models/banner.model';
import { JwtAuthGuard } from '../../security/jwt-auth.guard';
import { BannerService } from './banner.service';

@ApiTags('Banner')
@Controller('Banner')
export class BannerController {
  /* CRUD End Points for Banner Created By Override */

  constructor(private service: BannerService) {}
  /* POST Banner End Point */
  @UseGuards(JwtAuthGuard)
  @Post()
  async saveBanner(@Body() req: Banner): Promise<Banner> {
    return this.service.save(req);
  }

  /* GET All Banners End Point */
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAllBanners(): Promise<Banner[]> {
    return this.service.findAll();
  }

  /* GET One Banner End Point */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Banner> {
    return this.service.findOne(id);
  }

  /* PUT  Banner End Point */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateBanner(@Param('id') id: string, @Body() req: Banner): Promise<any> {
    return this.service.update(id, req);
  }

  /* Delete  Banner End Point */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteBanner(@Param('id') id: string): Promise<any> {
    return this.service.remove(id);
  }

  /* End of Banner Controller Class 
   
   */
}
