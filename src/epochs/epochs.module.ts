import { Module } from '@nestjs/common';
import { EpochsService } from './epochs.service';
import { EpochsResolver } from './epochs.resolver';

@Module({
  providers: [EpochsResolver, EpochsService],
})
export class EpochsModule {}
