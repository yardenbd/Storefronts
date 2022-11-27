import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const createDbConfig = (): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PROT),
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    cache: {
      duration: 5000,
    },
  };
};
