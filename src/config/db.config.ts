import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { EntitySchema } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import { resolve } from 'path';

export class TypeOrmConfig {
  static getOrmConfig(
    configService: ConfigService,
    entities: string | Function | EntitySchema,
  ): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: parseInt(configService.get('DB_PORT')),
      username: configService.get('DB_USERNAME'),
      database: configService.get('DB_NAME'),
      password: configService.get('DB_PASSWORD'),
      entities: [entities],
      synchronize: true,
    };
  }
}

export const createDbConfig = <T>(
  entities: string | Function | EntitySchema<T>,
): TypeOrmModuleAsyncOptions => {
  const TypeOrmModuleAsync: TypeOrmModuleAsyncOptions = {
    imports: [ConfigModule],
    useFactory: async (
      configService: ConfigService,
    ): Promise<TypeOrmModuleOptions> =>
      TypeOrmConfig.getOrmConfig(configService, entities),
    inject: [ConfigService],
  };
  return TypeOrmModuleAsync;
};

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  const fallback: string = resolve(`${dest}/.env`);
  const filename: string = env ? `${env}.env` : 'development.env';
  let filePath: string = resolve(`${dest}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  return filePath;
}

// {
//   const A = new ConfigService();
//   console.log('a', A.get('DB_USERNAME'));
//   return {
//     type: 'postgres',
//     host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT, 10),
//     username: process.env.DB_USERNAME,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     entities: [entities],
//     synchronize: true,
//   };
// },

// return {
//   imports: [ConfigModule],
//   inject: [ConfigService],
//   useFactory: async (): Promise<TypeOrmModuleOptions> => {
//     const A = new ConfigService();
//     console.log('a', A.get('DB_USERNAME'));
//     return {
//       type: 'postgres',
//       host: process.env.DB_HOST,
//       port: parseInt(process.env.DB_PORT, 10),
//       username: process.env.DB_USERNAME,
//       database: process.env.DB_NAME,
//       password: process.env.DB_PASSWORD,
//       entities: [entities],
//       synchronize: true,
//     };
//   },
// };
