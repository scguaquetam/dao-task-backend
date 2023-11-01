import { Module } from '@nestjs/common';
import { BaseTasksService } from './base-tasks.service';
import { BaseTasksResolver } from './base-tasks.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/organization/entities/organization.entity';
import { BaseTask } from './entities/base-task.entity';
import { OrganizationService } from 'src/organization/organization.service';
import { OrganizationModule } from 'src/organization/organization.module';

@Module({
  providers: [BaseTasksResolver, BaseTasksService],
  imports: [
    TypeOrmModule.forFeature([BaseTask]),
    OrganizationModule
  ],
})
export class BaseTasksModule {}
