import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GlobalFilter, GlobalSearch } from '../../dtos/search.dto';
import { Sort } from '../../enums/sort.enum';
import { Course } from '../../database-models/course/course.model';
import { JwtAuthGuard } from '../../security/jwt-auth.guard';
import { SearchService } from './search.service';

@ApiTags('Search')
@Controller('Search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async global(
    @Req() req,
    @Query('search') search: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<GlobalSearch> {
    return this.searchService.globalSearch(
      req,
      search,
      (+page ?? 1) - 1,
      +limit ?? 15,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('filter')
  @ApiQuery({
    name: 'rate',
    description: 'rate sorting',
    enum: [Sort.HTL, Sort.LTH],
  })
  @ApiQuery({ name: 'page', description: 'page', required: true })
  @ApiQuery({ name: 'limit', description: 'number of pages', required: false })
  @ApiQuery({ name: 'gradeId', description: 'gradeId', required: false })
  @ApiQuery({ name: 'stageId', description: 'stageId', required: false })
  @ApiQuery({ name: 'cityId', description: 'cityId', required: false })
  @ApiQuery({ name: 'subjectId', description: 'subjectId', required: true })
  async filter(
    @Req() req,
    @Query('subjectId') subjectId: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 1000,
    @Query('gradeId') gradeId: string,
    @Query('stageId') stageId: string,
    @Query('cityId') cityId: string,
    @Query('rate') rate: Sort,
  ): Promise<GlobalFilter> {
    return this.searchService.filter(
      req,
      subjectId,
      gradeId,
      stageId,
      cityId,
      rate,
      (+page ?? 1) - 1,
      +limit ?? 15,
    );
  }
}
