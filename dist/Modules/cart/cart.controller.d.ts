import { Course } from '../../models/course/course.model';
import { CartService } from './cart.service';
export declare class CartController {
    private service;
    constructor(service: CartService);
    addToCart(req: any, courseId: string): Promise<Course[]>;
    deleteFromCart(req: any, courseId: string): Promise<Course[]>;
    myCart(req: any): Promise<Course[]>;
}
