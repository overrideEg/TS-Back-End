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
import { ContactUs } from '../../models/contact-us.model';
import { JwtAuthGuard } from '../auth/security/jwt-auth.guard';
import { ContactUsService } from './contact-us.service';

@ApiTags('ContactUs')
@Controller('ContactUs')
export class ContactUsController {
  /* CRUD End Points for ContactUs Created By Override */

  constructor(private service: ContactUsService) {}
  /* POST ContactUs End Point */
  @UseGuards(JwtAuthGuard)
  @Post()
  async saveContactUs(@Body() req: ContactUs): Promise<ContactUs> {
    return this.service.save(req);
  }

  /* GET All ContactUss End Point */
  @UseGuards(JwtAuthGuard)
  @Get('/')
  getAllContactUss(): Promise<ContactUs[]> {
    return this.service.findAll();
  }

  /* GET One ContactUs End Point */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ContactUs> {
    return this.service.findOne(id);
  }

  /* PUT  ContactUs End Point */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateContactUs(
    @Param('id') id: string,
    @Body() req: ContactUs,
  ): Promise<any> {
    return this.service.update(id, req);
  }

  /* Delete  ContactUs End Point */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteContactUs(@Param('id') id: string): Promise<any> {
    return this.service.remove(id);
  }

  /* End of ContactUs Controller Class 
   
   */
}
