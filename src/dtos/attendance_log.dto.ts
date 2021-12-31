import { Prop } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';
import { User } from "../database-models/user.model";
export class AttendanceLog {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name,
        autopopulate: true,
    })
    user?: User;
    @Prop({})
    time?: number;
}