import { AuthService } from '../auth/auth.service';
import { Model } from 'mongoose';
import { LearningClassDocument } from '../../models/learning-class.model';
import { CourseService } from '../course/course.service';
import { CheckoutService } from '../checkout/checkout.service';
import { NoticeService } from '../notice/notice.service';
export declare class LearningClassService {
    private model;
    authenticationService: AuthService;
    private checkoutService;
    private courseService;
    private noticeService;
    constructor(model: Model<LearningClassDocument>, authenticationService: AuthService, checkoutService: CheckoutService, courseService: CourseService, noticeService: NoticeService);
}
