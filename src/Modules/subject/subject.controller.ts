import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Subject } from '../../Models/subject.model';
import { JwtAuthGuard } from '../auth/Security/jwt-auth.guard';
import { SubjectService } from './subject.service';

@ApiTags('Subject')
@Controller('Subject')
export class SubjectController { 

/* CRUD End Points for Subject Created By Override */


constructor(private service:  SubjectService) 
 { }
/* POST Subject End Point */
@UseGuards(JwtAuthGuard) 
 @Post() 
 async saveSubject(@Body() req: Subject) :Promise<Subject> {
return this.service.save(req) 
 } 
 
 
/* GET All Subjects End Point */
@UseGuards(JwtAuthGuard) 
 @Get('/') 
 getAllSubjects() :Promise<Subject[]> {
return this.service.findAll(); 
 } 
 

/* GET One Subject End Point */
@UseGuards(JwtAuthGuard) 
 @Get(':id') 
 findOne(@Param('id') id: string) :Promise<Subject> {
return this.service.findOne(id); 
 } 
  
 
/* PUT  Subject End Point */
@UseGuards(JwtAuthGuard) 
 @Put(':id') 
 updateSubject(@Param('id') id: string, @Body() req: Subject)  :Promise<any>{
 return this.service.update(id, req);
 } 
 

/* Delete  Subject End Point */
@UseGuards(JwtAuthGuard) 
 @Delete(':id') 
 deleteSubject(@Param('id') id: string) :Promise<any>{
return this.service.remove(id) 
 } 
 
/* End of Subject Controller Class 
 
 */
}