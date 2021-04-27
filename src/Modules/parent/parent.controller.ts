import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Parent } from '../../Models/parent.model';
import { JwtAuthGuard } from '../auth/Security/jwt-auth.guard';
import { Roles } from '../auth/Security/roles.decorator';
import { ParentService } from './parent.service';


@ApiTags('Parent')
@Controller('Parent')
export class ParentController { 

/* CRUD End Points for Parent Created By Override */


constructor(private service:  ParentService) 
 { }
/* POST Parent End Point */

 
 
/* GET All Parents End Point */
@Roles('admin')
@UseGuards(JwtAuthGuard) 
 @Get('/all') 
 getAllParents() :Promise<Parent[]> {
return this.service.findAll(); 
 } 
 

/* GET One Parent End Point */
@Roles('admin')
@UseGuards(JwtAuthGuard) 
 @Get(':id') 
 findOne(@Param('id') id: string) :Promise<Parent> {
return this.service.findOne(id); 
 } 
  
 
/* PUT  Parent End Point */
@Roles('admin')
@UseGuards(JwtAuthGuard) 
 @Put(':id') 
 updateParent(@Param('id') id: string, @Body() req: Parent)  :Promise<any>{
 return this.service.update(id, req);
 } 
 

/* Delete  Parent End Point */
@Roles('admin')
@UseGuards(JwtAuthGuard) 
 @Delete(':id') 
 deleteParent(@Param('id') id: string) :Promise<any>{
return this.service.remove(id) 
 } 
 
/* End of Parent Controller Class 
 
 */
}