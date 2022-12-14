import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StorefrontModule } from './storefront/storefront.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { createDbConfig } from './config/db.config';
import { CouponModule } from './copoun/coupon.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { OrderDetailsModule } from './order-details/order-details.module';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => createDbConfig(),
    }),
    StorefrontModule,
    OrdersModule,
    CouponModule,
    MenuItemModule,
    OrderDetailsModule,
  ],
})
export class AppModule {}
