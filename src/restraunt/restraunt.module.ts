import { Module } from '@nestjs/common';
import { RestrauntService } from './restraunt.service';
import { RestrauntResolver } from './restraunt.resolver';

@Module({
  providers: [RestrauntResolver, RestrauntService]
})
export class RestrauntModule {}
