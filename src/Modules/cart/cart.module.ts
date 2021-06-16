import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../Models/user.model';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
      UserModule
    ],
    controllers: [
        CartController],
    providers: [
        CartService],
})
export class CartModule { }
