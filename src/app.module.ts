import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join, resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestrauntModule } from './restraunt/restraunt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { createDbConfig } from './config/db.config';
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
    RestrauntModule,
    OrdersModule,
  ],
})
export class AppModule {}
