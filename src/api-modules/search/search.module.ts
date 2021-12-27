import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { UserModule } from '../user/user.module';
import { CourseModule } from '../course/course.module';
import { CheckoutModule } from '../checkout/checkout.module';

@Module({
  imports: [CourseModule, CheckoutModule, UserModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
