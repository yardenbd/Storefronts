import { Module } from '@nestjs/common';
import { RestrauntService } from './restraunt.service';
import { RestrauntResolver } from './restraunt.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restraunt } from './entities/restraunt.entity';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [TypeOrmModule.forFeature([Restraunt])],
  providers: [RestrauntResolver, RestrauntService],
})
export class RestrauntModule {}
