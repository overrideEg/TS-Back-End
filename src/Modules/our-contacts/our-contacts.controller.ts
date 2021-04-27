import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OurContacts } from '../../Models/our-contacts';
import { JwtAuthGuard } from '../auth/Security/jwt-auth.guard';
import { OurContactsService } from './our-contacts.service';

@ApiTags('OurContacts')
@Controller('OurContacts')
export class OurContactsController {

  /* CRUD End Points for OurContacts Created By Override */


  constructor(private service: OurContactsService) { }
  /* POST OurContacts End Point */
  @UseGuards(JwtAuthGuard)
  @Post()
  async saveOurContacts(@Body() req: OurContacts): Promise<OurContacts> {
    return this.service.save(req)
  }


  /* GET All OurContactss End Point */
  // @UseGuards(JwtAuthGuard)
  @Get('/')
  getAllOurContactss(): Promise<OurContacts> {
    return this.service.findAll();
  }


  /* GET One OurContacts End Point */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<OurContacts> {
    return this.service.findOne(id);
  }


  /* PUT  OurContacts End Point */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOurContacts(@Param('id') id: string, @Body() req: OurContacts): Promise<any> {
    return this.service.update(id, req);
  }


  /* Delete  OurContacts End Point */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOurContacts(@Param('id') id: string): Promise<any> {
    return this.service.remove(id)
  }

  /* End of OurContacts Controller Class 
   
   */
}