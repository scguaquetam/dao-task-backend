import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationService } from './organization.service';
import { OrganizationResolver } from './organization.resolver';
import { User } from 'src/users/entities/user.entity';
import { Organization } from './entities/organization.entity';
import { Epoch } from 'src/epochs/entities/epoch.entity';

@Module({
  providers: [OrganizationResolver, OrganizationService],
  imports: [
    TypeOrmModule.forFeature([User, Organization, Epoch]),
  ],
  exports: [OrganizationService]
})
export class OrganizationModule {}
