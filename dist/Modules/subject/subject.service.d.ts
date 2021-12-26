import { Model } from 'mongoose';
import { Subject, SubjectDocument } from '../../models/subject.model';
export declare class SubjectService {
    private SubjectModel;
    constructor(SubjectModel: Model<SubjectDocument>);
    save(req: Subject): Promise<Subject & import("mongoose").Document<any, any, any> & {
        _id: any;
    }>;
    findAll(): Promise<Subject[]>;
    findOne(id: string): Promise<Subject>;
    update(id: string, req: Subject): Promise<Subject>;
    remove(id: string): Promise<Subject>;
}
