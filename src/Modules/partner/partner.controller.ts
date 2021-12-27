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
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Partner } from '../../database-models/partner.model';
import { JwtAuthGuard } from '../../security/jwt-auth.guard';
import { PartnerService } from './partner.service';

@ApiTags('Partner')
@Controller('Partner')
export class PartnerController {
  /* CRUD End Points for Partner Created By Override */

  constructor(private service: PartnerService) {}
  /* POST Partner End Point */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async savePartner(@Body() req: Partner): Promise<Partner> {
    return this.service.save(req);
  }

  /* GET All Partners End Point */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAllPartners(): Promise<Partner[]> {
    return this.service.findAll();
  }

  /* GET One Partner End Point */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Partner> {
    return this.service.findOne(id);
  }

  /* PUT  Partner End Point */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updatePartner(@Param('id') id: string, @Body() req: Partner): Promise<any> {
    return this.service.update(id, req);
  }

  /* Delete  Partner End Point */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePartner(@Param('id') id: string): Promise<any> {
    return this.service.remove(id);
  }

  /* End of Partner Controller Class 
   
   */
}
