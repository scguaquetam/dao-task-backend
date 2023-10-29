import { Module } from '@nestjs/common';
import { BaseTasksService } from './base-tasks.service';
import { BaseTasksResolver } from './base-tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/organization/entities/organization.entity';

@Module({
  providers: [BaseTasksResolver, BaseTasksService],
  imports: [
    TypeOrmModule.forFeature([Organization]),
  ],
})
export class BaseTasksModule {}
