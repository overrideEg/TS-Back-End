import { Model } from 'mongoose';
import { OnBoarding, OnBoardingDocument } from '../../models/on-boarding.model';
export declare class OnBoardingService {
    private OnBoardingModel;
    constructor(OnBoardingModel: Model<OnBoardingDocument>);
    save(req: OnBoarding): Promise<OnBoarding & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): Promise<OnBoarding[]>;
    findOne(id: string): Promise<OnBoarding>;
    update(id: string, req: OnBoarding): Promise<OnBoarding>;
    remove(id: string): Promise<OnBoarding>;
}
