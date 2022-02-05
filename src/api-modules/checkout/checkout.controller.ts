import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Render,
  Req,
  UseGuards,
  Request,
  Redirect,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CheckoutDTO } from '../../dtos/checkout-dto';
import { Checkout } from '../../database-models/checkout.model';
import { JwtAuthGuard } from '../../security/jwt-auth.guard';
import { CheckoutService } from './checkout.service';
import { InAppPurchaseRequest } from '../../dtos/in-app-purchase-request.dto';

@ApiTags('Checkout')
@Controller('Checkout')
export class CheckoutController {
  /* CRUD End Points for Checkout Created By Override */

  constructor(private service: CheckoutService) { }
  /* POST Checkout End Point */
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async checkAndPay(
    @Req() req,
    @Body() body: CheckoutDTO,
  ): Promise<Checkout[]> {
    return this.service.checkAndPay(req, body);
  }

  @Get('payment/:id')
  @Render('payment.hbs')
  payment(
    @Req() req,
    @Param('id') id: string,
    @Query('paymentMethod') paymentMethod: string,
  ) {
    const fullUrl = 'http://' + req.hostname + '/v1';
    return {
      id: id,
      resultUrl: fullUrl + `/Checkout/authorize/${paymentMethod}/${id}`,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('inAppPurchase')
  verifyInAppPurchase(@Req() req,@Body() body: InAppPurchaseRequest) {
    return this.service.verifyInAppPurchase(req,body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('purchased/:courseId')
  purchased(@Req() req,@Param('courseId') courseId: string) {
    return this.service.purchased(req,courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('subscribers/:courseId')
  subscribers(@Req() req,@Param('courseId') courseId: string) {
    return this.service.subscribers(req,courseId);
  }

  @Redirect('https://tsacademy.info/homePage', 301)

  @Get('authorize/:paymentMethod/:paymentId')
  authorize(
    @Param('paymentMethod') paymentMethod: string,
    @Param('paymentId') id: string,
    @Query('resourcePath') resourcePath: string,
  ) {
    this.service.authorize(paymentMethod, id, resourcePath);
  }
}
