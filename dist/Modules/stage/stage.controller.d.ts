import { Stage } from '../../models/stage.model';
import { StageService } from './stage.service';
export declare class StageController {
    private service;
    constructor(service: StageService);
    saveStage(req: Stage): Promise<Stage>;
    getAllStages(): Promise<Stage[]>;
    findOne(id: string): Promise<Stage>;
    updateStage(id: string, req: Stage): Promise<any>;
    deleteStage(id: string): Promise<any>;
}
