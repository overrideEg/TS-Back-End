import { StudentHome, TeacherHome } from '../../dtos/home.dto';
import { BannerService } from '../banner/banner.service';
import { PartnerService } from '../partner/partner.service';
import { UserService } from '../user/user.service';
import { SubjectService } from '../subject/subject.service';
import { CourseService } from '../course/course.service';
import { CheckoutService } from '../checkout/checkout.service';
export declare class HomeService {
    private bannerService;
    private partnerService;
    private userService;
    private subjectService;
    private courseService;
    private checkoutService;
    constructor(bannerService: BannerService, partnerService: PartnerService, userService: UserService, subjectService: SubjectService, courseService: CourseService, checkoutService: CheckoutService);
    getStudentHome(req: any): Promise<StudentHome | PromiseLike<StudentHome>>;
    getTeacherHome(req: any): Promise<TeacherHome | PromiseLike<TeacherHome>>;
}
