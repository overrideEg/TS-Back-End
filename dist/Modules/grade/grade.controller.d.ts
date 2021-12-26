import { Grade } from '../../models/grade.model';
import { GradeService } from './grade.service';
export declare class GradeController {
    private service;
    constructor(service: GradeService);
    saveGrade(req: Grade): Promise<Grade>;
    getAllGrades(): Promise<Grade[]>;
    getAllGradesByStageId(stageId: string): Promise<Grade[]>;
    findOne(id: string): Promise<Grade>;
    updateGrade(id: string, req: Grade): Promise<any>;
    deleteGrade(id: string): Promise<any>;
}
