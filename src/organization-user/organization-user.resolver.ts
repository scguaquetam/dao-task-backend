import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrganizationUserService } from './organization-user.service';
import { OrganizationUser } from './entities/organization-user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Organization } from 'src/organization/entities/organization.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => OrganizationUser)
@UseGuards(JwtAuthGuard)
export class OrganizationUserResolver {
  constructor(private readonly organizationUserService: OrganizationUserService) {}

  @Query(() => [Organization], { name: 'organizationOfUser' })
  async getOrganizationsOfUser(
    @CurrentUser() user: User,
  ): Promise<Organization[]> {
    return await this.organizationUserService.findOrganizationsByUser(user.id);
  }
  // @Query(() => [OrganizationUser], { name: 'organizationUser' })
  // findAll() {
  //   return this.organizationUserService.findAll();
  // }

  // @Query(() => OrganizationUser, { name: 'organizationUser' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.organizationUserService.findOne(id);
  // }

  // @Mutation(() => OrganizationUser)
  // updateOrganizationUser(@Args('updateOrganizationUserInput') updateOrganizationUserInput: UpdateOrganizationUserInput) {
  //   return this.organizationUserService.update(updateOrganizationUserInput.id, updateOrganizationUserInput);
  // }

  // @Mutation(() => OrganizationUser)
  // removeOrganizationUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.organizationUserService.remove(id);
  // }
}
