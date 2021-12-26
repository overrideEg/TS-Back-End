import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Promotion, PromotionDocument } from '../../models/promotion.model';
import { CheckoutService } from '../checkout/checkout.service';
@Injectable()
export class PromotionService {
  constructor(
    @InjectModel(Promotion.name)
    public PromotionModel: Model<PromotionDocument>,
    @Inject(forwardRef(() => CheckoutService))
    private checkoutService: CheckoutService,
  ) {}

  async save(req: Promotion) {
    let saved = await this.PromotionModel.create(req);
    return saved;
  }

  async getPromotionByCode(code: string): Promise<Promotion> {
    let promotion = await this.PromotionModel.findOne({
      code: code,
      fromDate: { $lte: Date.now() },
      toDate: { $gte: Date.now() },
    });
    if (!promotion) {
      throw new BadRequestException(`promotion with code ${code} not found`);
    }
    if (promotion.useOnce) {
      if (
        await this.checkoutService.CheckoutModel.exists({ promoCode: code })
      ) {
        throw new BadRequestException(
          `promotion with code ${code} is used before`,
        );
      }
    }
    return promotion;
  }

  async findAll(): Promise<Promotion[]> {
    return this.PromotionModel.find().exec();
  }
  async findOne(id: string): Promise<Promotion> {
    return this.PromotionModel.findById(id).exec();
  }

  async update(id: string, req: Promotion): Promise<Promotion> {
    await this.PromotionModel.findByIdAndUpdate(id, req);
    return this.findOne(id);
  }
  async remove(id: string): Promise<Promotion> {
    return await this.PromotionModel.findByIdAndRemove(id);
  }
}
