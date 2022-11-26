import { Module } from '@nestjs/common';
import { StorefrontService } from './storefront.service';
import { StorefrontResolver } from './storefront.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storefront } from './entities/storefront.entity';
import { MenuItem } from '../menu-item/entities/menu-item.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Storefront]),
    TypeOrmModule.forFeature([MenuItem]),
  ],
  providers: [StorefrontResolver, StorefrontService],
})
export class StorefrontModule {}
