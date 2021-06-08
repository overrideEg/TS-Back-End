import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { profile } from 'console';
import { UpdateProfile } from '../../dtos/update-profile.dto';
import { User, UserType } from '../../Models/user.model';
import { JwtAuthGuard } from '../auth/Security/jwt-auth.guard';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('User')
export class UserController {

    /* CRUD End Points for User Created By Override */


    constructor(private service: UserService) { }
    /* POST User End Point */
    @UseGuards(JwtAuthGuard)
    @Post()
    async saveUser(@Body() req: User): Promise<User> {
        return this.service.save(req)
    }


    /* GET All Users End Point */
    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @ApiQuery({ name: 'userType', enum: [UserType.admin,UserType.parent,UserType.student,UserType.teacher], required: false })
    getAllUsers(@Query('userType') userType: string): Promise<User[]> {
        return this.service.findAll(userType);
    }


    @UseGuards(JwtAuthGuard)
    @Get('/profile')
    getMyProfile(@Req() req): Promise<User> {
        return this.service.myProfile(req);
    }

    /* GET One User End Point */
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.service.findOne(id);
    }


    /* PUT  User End Point */
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    updateUser(@Param('id') id: string, @Body() req: User): Promise<any> {
        return this.service.update(id, req);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/profile')
    updateProfile(@Req() req, @Body() profile: UpdateProfile): Promise<User> {
        return this.service.updateProfile(req, profile);
    }

    /* Delete  User End Point */
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteUser(@Param('id') id: string): Promise<any> {
        return this.service.remove(id)
    }

    /* End of User Controller Class 
     
     */
}