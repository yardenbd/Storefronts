import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storefront } from '../storefront/entities/storefront.entity';
import { CouponResolver } from './coupon.resolver';
import { CouponService } from './coupon.service';
@Module({
  imports: [TypeOrmModule.forFeature([Storefront])],
  providers: [CouponResolver, CouponService],
})
export class CouponModule {}
