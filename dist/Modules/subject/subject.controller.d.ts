import { Subject } from '../../models/subject.model';
import { SubjectService } from './subject.service';
export declare class SubjectController {
    private service;
    constructor(service: SubjectService);
    saveSubject(req: Subject): Promise<Subject>;
    getAllSubjects(): Promise<Subject[]>;
    findOne(id: string): Promise<Subject>;
    updateSubject(id: string, req: Subject): Promise<any>;
    deleteSubject(id: string): Promise<any>;
}
