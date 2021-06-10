import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { GlobalFilter, GlobalSearch } from '../../dtos/search.dto';
import { Sort } from '../../enums/sort.enum';
import { Course } from '../../Models/course.model';
import { JwtAuthGuard } from '../auth/Security/jwt-auth.guard';
import { SearchService } from './search.service';

@Controller('Search')
export class SearchController {
  constructor(private readonly searchService: SearchService) { }

  @UseGuards(JwtAuthGuard)
  @Get()
  async global(@Req() req,
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('limit') limit: number): Promise<GlobalSearch> {
    return this.searchService.findAll(req, search, (+page ?? 1) - 1, +limit ?? 15)
  }
  @UseGuards(JwtAuthGuard)
  @Get(':subjectId')
  @ApiQuery({ name: 'rate', description: 'rate sorting', enum: [Sort.HTL, Sort.LTH] })
  async filter(
    @Req() req,
    @Param('subjectId') subjectId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('gradeId') gradeId: string,
    @Query('stageId') stageId: string,
    @Query('cityId') cityId: string,
    @Query('rate') rate: Sort,
  ): Promise<GlobalFilter> {
    return this.searchService.filter(req, subjectId, gradeId, stageId, cityId, rate, (+page ?? 1) - 1, +limit ?? 15)
  }
}
