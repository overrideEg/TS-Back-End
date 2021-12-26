import { GlobalFilter, GlobalSearch } from '../../dtos/search.dto';
import { Sort } from '../../enums/sort.enum';
import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    global(req: any, search: string, page: number, limit: number): Promise<GlobalSearch>;
    filter(req: any, subjectId: string, page: number, limit: number, gradeId: string, stageId: string, cityId: string, rate: Sort): Promise<GlobalFilter>;
}
