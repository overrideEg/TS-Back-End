import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Pricing } from '../../database-models/pricing.model';
import { ClientGuard } from '../../security/client.guard';
import { JwtAuthGuard } from '../../security/jwt-auth.guard';
import { Roles } from '../../security/roles.decorator';
import { PricingService } from './pricing.service';

@ApiTags('Pricing')
@Controller('Pricing')
export class PricingController {
  /* CRUD End Points for Pricing Created By Override */

  constructor(private service: PricingService) {}
  /* POST Pricing End Point */
  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Post()
  async saveHome(@Body() req: Pricing): Promise<Pricing> {
    return this.service.save(req);
  }

  /* GET  Pricings End Point */
  // @UseGuards(ClientGuard)
  @Get()
  getHome(): Promise<Pricing> {
    return this.service.getCurrentPricings();
  }
}
