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
import { getEnvPath } from './config/db.config';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        name: 'yarden',
        username: 'postgres',
        database: 'postgres',
        password: 'Yb212081046',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    RestrauntModule,
    OrdersModule,
  ],
})
export class AppModule {}
