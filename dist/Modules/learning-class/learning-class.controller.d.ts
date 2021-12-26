import { StartLiveDTO } from '../../dtos/start-live.dto';
import { LearningClassService } from './learning-class.service';
export declare class LearningClassController {
    private service;
    constructor(service: LearningClassService);
    startLive(req: any, body: StartLiveDTO): Promise<any>;
    join(req: any, body: StartLiveDTO): Promise<any>;
    endLive(req: any, body: StartLiveDTO): Promise<any>;
    leave(req: any, body: StartLiveDTO): Promise<any>;
}
