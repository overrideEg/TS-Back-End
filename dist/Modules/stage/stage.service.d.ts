import { Model } from 'mongoose';
import { Stage, StageDocument } from '../../models/stage.model';
export declare class StageService {
    private StageModel;
    constructor(StageModel: Model<StageDocument>);
    save(req: Stage): Promise<Stage & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): Promise<Stage[]>;
    findOne(id: string): Promise<Stage>;
    update(id: string, req: Stage): Promise<Stage>;
    remove(id: string): Promise<Stage>;
}
