import { Model } from 'mongoose';
import { Grade, GradeDocument } from '../../models/grade.model';
export declare class GradeService {
    private GradeModel;
    constructor(GradeModel: Model<GradeDocument>);
    save(req: Grade): Promise<Grade & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): Promise<Grade[]>;
    findAllGradesByStageId(stageId: string): Promise<Grade[]>;
    findOne(id: string): Promise<Grade>;
    update(id: string, req: Grade): Promise<Grade>;
    remove(id: string): Promise<Grade>;
}
