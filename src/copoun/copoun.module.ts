import { Module } from '@nestjs/common';
import { CopounService } from './copoun.service';
import { CopounResolver } from './copoun.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Copoun } from './entities/copoun.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Copoun])],
  providers: [CopounResolver, CopounService],
})
export class CopounModule {}
