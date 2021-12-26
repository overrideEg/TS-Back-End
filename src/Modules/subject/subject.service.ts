import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject, SubjectDocument } from '../../models/subject.model';
@Injectable()
export class SubjectService {
constructor(
 @InjectModel(Subject.name) private SubjectModel: Model<SubjectDocument>
 ) { }
 async save(req: Subject) {
let saved = await this.SubjectModel.create(req);
 return saved;
}
 async findAll(): Promise<Subject[]> {
  return this.SubjectModel.find().exec();
 }
 async findOne(id: string): Promise<Subject> {
return this.SubjectModel.findById(id).exec();
 }
async update(id: string, req: Subject): Promise<Subject> {
   await this.SubjectModel.findByIdAndUpdate(id, req)
 return this.findOne(id);
 }
 async remove(id: string): Promise<Subject> {
 return await this.SubjectModel.findByIdAndRemove(id);
}
}