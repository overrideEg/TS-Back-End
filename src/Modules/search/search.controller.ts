import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { GloalSearch } from '../../dtos/global-search.dto';
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
    @Query('limit') limit: number): Promise<GloalSearch> {
    return this.searchService.findAll(req, search, (+page ?? 1)-1, +limit ?? 15)
  }
}
