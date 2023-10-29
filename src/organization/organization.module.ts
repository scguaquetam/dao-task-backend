import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationService } from './organization.service';
import { OrganizationResolver } from './organization.resolver';
import { User } from 'src/users/entities/user.entity';
import { Organization } from './entities/organization.entity';
import { Epoch } from 'src/epochs/entities/epoch.entity';
import { BaseTask } from 'src/base-tasks/entities/base-task.entity';
import { OrganizationUserService } from 'src/organization-user/organization-user.service';
import { OrganizationUserModule } from 'src/organization-user/organization-user.module';

@Module({
  providers: [OrganizationResolver, OrganizationService],
  imports: [
    TypeOrmModule.forFeature([User, Organization, Epoch, BaseTask]),
    OrganizationUserModule
  ],
  exports: [OrganizationService]
})
export class OrganizationModule {}
