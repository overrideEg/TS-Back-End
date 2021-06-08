import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../Models/user.model';

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: User.name,
                useFactory: async () => {
                    const schema = UserSchema;
                    schema.plugin(require('mongoose-autopopulate'));
                    return schema;
                },
            }
        ]),
    ],
    controllers: [
        CartController],
    providers: [
        CartService],
})
export class CartModule { }
