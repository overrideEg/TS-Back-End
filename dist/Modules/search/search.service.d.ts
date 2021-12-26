import { GlobalFilter, GlobalSearch } from '../../dtos/search.dto';
import { Sort } from '../../enums/sort.enum';
import { CheckoutService } from '../checkout/checkout.service';
import { CourseService } from '../course/course.service';
import { UserService } from '../user/user.service';
export declare class SearchService {
    private courseService;
    private checkoutService;
    private userService;
    constructor(courseService: CourseService, checkoutService: CheckoutService, userService: UserService);
    globalSearch(req: any, search: string, page: number, limit: number): Promise<GlobalSearch | PromiseLike<GlobalSearch>>;
    filter(req: any, subjectId: string, gradeId: string, stageId: string, cityId: string, rate: Sort, page: number, limit: number): Promise<GlobalFilter | PromiseLike<GlobalFilter>>;
}
