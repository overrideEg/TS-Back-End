import { OnBoarding } from '../../models/on-boarding.model';
import { OnBoardingService } from './on-boarding.service';
export declare class OnBoardingController {
    private service;
    constructor(service: OnBoardingService);
    saveOnBoarding(req: OnBoarding): Promise<OnBoarding>;
    getAllOnBoardings(): Promise<OnBoarding[]>;
    findOne(id: string): Promise<OnBoarding>;
    updateOnBoarding(id: string, req: OnBoarding): Promise<any>;
    deleteOnBoarding(id: string): Promise<any>;
}
