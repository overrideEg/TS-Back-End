import { Course } from '../../models/course/course.model';
import { UserService } from '../user/user.service';
export declare class CartService {
    private userService;
    constructor(userService: UserService);
    addToCart(req: any, courseId: string): Promise<Course[] | PromiseLike<Course[]>>;
    deleteFromCart(req: any, courseId: string): Promise<Course[] | PromiseLike<Course[]>>;
    myCart(req: any): Promise<Course[] | PromiseLike<Course[]>>;
}
