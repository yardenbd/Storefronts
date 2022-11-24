import { Module } from '@nestjs/common';
import { StorefrontService } from './storefront.service';
import { StorefrontResolver } from './storefront.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storefront } from './entities/storefront.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Storefront])],
  providers: [StorefrontResolver, StorefrontService],
})
export class StorefrontModule {}
