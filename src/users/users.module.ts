import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Organization } from 'src/organization/entities/organization.entity';

@Module({
  providers: [
    UsersResolver, 
    UsersService
  ],
  imports: [
    TypeOrmModule.forFeature([User, Organization]),
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
