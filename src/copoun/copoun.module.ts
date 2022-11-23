import { Module } from '@nestjs/common';
import { CopounService } from './copoun.service';
import { CopounResolver } from './copoun.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Number])],
  providers: [CopounResolver, CopounService],
})
export class CopounModule {}
