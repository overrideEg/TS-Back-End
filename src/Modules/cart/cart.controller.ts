import { Controller, Delete, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { Course } from '../../Models/course.model';
import { JwtAuthGuard } from '../auth/Security/jwt-auth.guard';
import { CartService } from './cart.service';

@Controller('Cart')
export class CartController {
    constructor(private service: CartService) { }


    @UseGuards(JwtAuthGuard)
    @Post()
    async addToCart(@Req() req,@Query('courseId') courseId: string): Promise<Course[]> {
        return this.service.addToCart(req,courseId);
    }


    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteFromCart(@Req() req,@Query('courseId') courseId: string): Promise<Course[]> {
        return this.service.deleteFromCart(req,courseId);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async myCart(@Req() req): Promise<Course[]> {
        return this.service.myCart(req);
    }

}
