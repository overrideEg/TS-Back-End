import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Parent, ParentDocument } from '../../Models/parent.model';
import { UserService } from '../user/user.service';
@Injectable()
export class ParentService {
    constructor(
        @InjectModel(Parent.name) private ParentModel: Model<ParentDocument>,
        private userService: UserService
    ) { }
    async save(req: Parent) {
        return await this.ParentModel.create(req);
    }
    async findAll(): Promise<Parent[]> {
        let parents = await this.ParentModel.find().populate('students')
        .populate({
            path: 'students',
            populate: { path: 'city', model: 'City', },
          })
        .populate({
            path: 'students',
            populate: { path: 'grade', model: 'Grade', },
          })
        .populate({
            path: 'students',
            populate: { path: 'stage', model: 'Stage', },
          }).lean()
          .exec();
        for await (let parent of parents) {
            parent.user = await this.userService.findByParent(parent['_id'])
            for await (let student of parent.students) {
                student.user = await this.userService.findByStudent(parent['_id'])
            }
        }
        return parents;
    }
    async findOne(id: string): Promise<Parent> {
        let parent = await this.ParentModel.findById(id).populate('students')
        .populate({
            path: 'students',
            populate: { path: 'city', model: 'City', },
          })
        .populate({
            path: 'students',
            populate: { path: 'grade', model: 'Grade', },
          })
        .populate({
            path: 'students',
            populate: { path: 'stage', model: 'Stage', },
          }).lean().exec();
        parent.user = await this.userService.findByParent(parent['_id'])
        for await (let student of parent.students) {
            student.user = await this.userService.findByStudent(parent['_id'])
        }
        return parent;
    }
    async update(id: string, req: Parent): Promise<Parent> {
        return await this.ParentModel.findByIdAndUpdate(id, req);
    }
    async remove(id: string): Promise<Parent> {
        return await this.ParentModel.findByIdAndRemove(id);
    }
}