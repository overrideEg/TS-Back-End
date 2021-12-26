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
import { Pricing } from '../../models/pricing.model';
import { UserType } from '../../models/user.model';
import { ClientGuard } from '../auth/security/client.guard';
import { JwtAuthGuard } from '../auth/security/jwt-auth.guard';
import { Roles } from '../auth/security/roles.decorator';
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
  @UseGuards(JwtAuthGuard)
  @Get()
  getHome(): Promise<Pricing> {
    return this.service.getCurrentPricings();
  }
}
