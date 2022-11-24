import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { EntitySchema } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import { resolve } from 'path';

export const createDbConfig = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PROT),
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
  };
};
