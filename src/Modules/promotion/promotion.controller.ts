import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Promotion } from '../../Models/promotion.model';
import { JwtAuthGuard } from '../auth/Security/jwt-auth.guard';
import { PromotionService } from './promotion.service';

@ApiTags('Promotion')
@Controller('Promotion')
export class PromotionController {

  /* CRUD End Points for Promotion Created By Override */

  constructor(private service: PromotionService) { }
  /* POST Promotion End Point */
  @UseGuards(JwtAuthGuard)
  @Post()
  async savePromotion(@Body() req: Promotion): Promise<Promotion> {
    return this.service.save(req)
  }


  /* GET All Promotions End Point */
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAllPromotions(): Promise<Promotion[]> {
    return this.service.findAll();
  }


  /* GET One Promotion End Point */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Promotion> {
    return this.service.findOne(id);
  }


  /* PUT  Promotion End Point */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updatePromotion(@Param('id') id: string, @Body() req: Promotion): Promise<any> {
    return this.service.update(id, req);
  }


  /* Delete  Promotion End Point */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePromotion(@Param('id') id: string): Promise<any> {
    return this.service.remove(id)
  }

  /* End of Promotion Controller Class 
   
   */
}