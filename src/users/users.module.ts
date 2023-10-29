import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { OrganizationUser } from 'src/organization-user/entities/organization-user.entity';

@Module({
  providers: [
    UsersResolver, 
    UsersService
  ],
  imports: [
    TypeOrmModule.forFeature([User, OrganizationUser]),
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
