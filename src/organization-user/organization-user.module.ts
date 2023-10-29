import { Module } from '@nestjs/common';
import { OrganizationUserService } from './organization-user.service';
import { OrganizationUserResolver } from './organization-user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from 'src/organization/entities/organization.entity';
import { User } from 'src/users/entities/user.entity';
import { OrganizationUser } from './entities/organization-user.entity';

@Module({
  providers: [OrganizationUserResolver, OrganizationUserService],
  imports: [
    TypeOrmModule.forFeature([Organization, User, OrganizationUser]),
  ],
  exports: [
    OrganizationUserService
  ]
})
export class OrganizationUserModule {}
