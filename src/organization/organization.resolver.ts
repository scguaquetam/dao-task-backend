import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { OrganizationService } from './organization.service';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationInput } from './dto/inputs/create-organization.input';
import { UpdateOrganizationInput } from './dto/inputs/update-organization.input';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ParseUUIDPipe, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Organization)
@UseGuards(JwtAuthGuard)
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  @Query(() => [Organization], { name: 'findAllOrgs' })
  async findAll(): Promise<Organization[]> {
    return this.organizationService.findAll();
  }

  @Query(() => Organization, { name: 'findOrganization' })
  async findOrganization(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser() user: User,
  ) {
    const organization = await this.organizationService.findOneByIdAndUser(
      id,
      user,
    );
    if (!organization) {
      throw new UnauthorizedException(
        'You are not a member of this organization or the organization does not exist.',
      );
    }
    return organization;
  }

  // @Query(() => [Organization], { name: 'organizationsByUser' })
  // async findByUser(@CurrentUser() user: User): Promise<Organization[]> {
  //   return this.organizationService.findByUser(user);
  // }

  @Mutation(() => Organization)
  updateOrganization(
    @Args('updateOrganizationInput')
    updateOrganizationInput: UpdateOrganizationInput,
  ) {
    return this.organizationService.update(
      updateOrganizationInput.id,
      updateOrganizationInput,
    );
  }

  @Mutation(() => Organization)
  removeOrganization(@Args('id', { type: () => Int }) id: number) {
    return this.organizationService.remove(id);
  }

  @Mutation(() => Organization, { name: 'createOrganization' })
  async createOrganization(
    @Args('createOrganizationInput')
    createOrganizationInput: CreateOrganizationInput,
    @CurrentUser() user: User,
  ): Promise<Organization> {
    return this.organizationService.create(createOrganizationInput, user);
  }
}
