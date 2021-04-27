import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OnBoarding } from '../../Models/on-boarding.model';
import { JwtAuthGuard } from '../auth/Security/jwt-auth.guard';
import { OnBoardingService } from './on-boarding.service';

@ApiTags('OnBoarding')
@Controller('OnBoarding')
export class OnBoardingController {

  /* CRUD End Points for OnBoarding Created By Override */


  constructor(private service: OnBoardingService) { }
  /* POST OnBoarding End Point */
  @UseGuards(JwtAuthGuard)
  @Post()
  async saveOnBoarding(@Body() req: OnBoarding): Promise<OnBoarding> {
    return this.service.save(req)
  }


  /* GET All OnBoardings End Point */
  // @UseGuards(JwtAuthGuard)
  @Get('/')
  getAllOnBoardings(): Promise<OnBoarding[]> {
    return this.service.findAll();
  }


  /* GET One OnBoarding End Point */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<OnBoarding> {
    return this.service.findOne(id);
  }


  /* PUT  OnBoarding End Point */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOnBoarding(@Param('id') id: string, @Body() req: OnBoarding): Promise<any> {
    return this.service.update(id, req);
  }


  /* Delete  OnBoarding End Point */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOnBoarding(@Param('id') id: string): Promise<any> {
    return this.service.remove(id)
  }

  /* End of OnBoarding Controller Class 
   
   */
}