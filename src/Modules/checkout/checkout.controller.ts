import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CheckoutDTO } from '../../dtos/checkout-dto';
import { Checkout } from '../../Models/checkout.model';
import { JwtAuthGuard } from '../auth/Security/jwt-auth.guard';
import { CheckoutService } from './checkout.service';

@ApiTags('Checkout')
@Controller('Checkout')
export class CheckoutController {

  /* CRUD End Points for Checkout Created By Override */


  constructor(private service: CheckoutService) { }
  /* POST Checkout End Point */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async checkAndPay(@Req() req,@Body() body: CheckoutDTO): Promise<Checkout[]> {
    return this.service.checkAndPay(req,body)
  }


}