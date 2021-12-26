import { StudentHome, TeacherHome } from '../../dtos/home.dto';
import { HomeService } from './home.service';
export declare class HomeController {
    private readonly homeService;
    constructor(homeService: HomeService);
    studentHome(req: any): Promise<StudentHome>;
    teacherHome(req: any): Promise<TeacherHome>;
}
