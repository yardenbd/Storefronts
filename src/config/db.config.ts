import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntitySchema } from 'typeorm';
export const createDbConfig = <T>(
  entities: string | Function | EntitySchema<T>,
): TypeOrmModuleOptions => {
  return {
    type: 'postgres',
    host: 'localhost',
    name: 'yarden',
    port: 5432,
    username: 'postgres',
    password: 'Yb212081046',
    database: 'postgres',
    entities: [entities],
    synchronize: true,
    logging: false,
  };
};
