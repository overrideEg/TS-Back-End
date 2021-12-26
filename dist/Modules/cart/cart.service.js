"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const ObjectId = require('mongoose').Types.ObjectId;
let CartService = class CartService {
    constructor(userService) {
        this.userService = userService;
    }
    async addToCart(req, courseId) {
        await this.userService.UserModel.findByIdAndUpdate(req.user._id, {
            $addToSet: { cart: new ObjectId(courseId) },
        }).exec();
        return this.myCart(req);
    }
    async deleteFromCart(req, courseId) {
        await this.userService.UserModel.findByIdAndUpdate(req.user._id, {
            $pull: { cart: new ObjectId(courseId) },
        });
        return this.myCart(req);
    }
    async myCart(req) {
        return await this.userService.UserModel.aggregate([
            {
                $match: {
                    $and: [{ _id: new ObjectId(req.user._id) }],
                },
            },
            {
                $lookup: {
                    from: 'courses',
                    localField: 'cart',
                    foreignField: '_id',
                    as: 'cart',
                },
            },
            { $unwind: '$cart' },
            {
                $replaceRoot: {
                    newRoot: '$cart',
                },
            },
            {
                $unset: [
                    'attachements',
                    'days',
                    'hour',
                    'excercices',
                    'reviews',
                    'startDate',
                    'grade',
                    'subject',
                    'teacher',
                ],
            },
        ]);
    }
};
CartService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], CartService);
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map