import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestrauntModule } from './restraunt/restraunt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        name: 'yarden',
        port: 5432,
        username: 'postgres',
        password: 'Yb212081046',
        database: 'postgres',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging:
          process.env.NODE_ENV !== 'prod' && process.env.NODE_ENV !== 'test',
      }),
    }),
    RestrauntModule,
  ],
})
export class AppModule {}
