import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrganizationService } from './organization.service';
import { Organization } from './entities/organization.entity';
import { CreateOrganizationInput } from './dto/inputs/create-organization.input';
import { UpdateOrganizationInput } from './dto/inputs/update-organization.input';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Organization)
@UseGuards(JwtAuthGuard)
export class OrganizationResolver {
  constructor(private readonly organizationService: OrganizationService) {}

  @Query(() => [Organization], { name: 'organization' })
  findAll() {
    return this.organizationService.findAll();
  }

  @Query(() => Organization, { name: 'organization' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.organizationService.findOne(id);
  }

  @Query(() => [Organization], { name: 'organizationsByUser' })
  async findByUser(
    @CurrentUser() user: User
  ) : Promise<Organization[]> {
    return this.organizationService.findByUser(user);
  }

  @Mutation(() => Organization)
  updateOrganization(@Args('updateOrganizationInput') updateOrganizationInput: UpdateOrganizationInput) {
    return this.organizationService.update(updateOrganizationInput.id, updateOrganizationInput);
  }

  @Mutation(() => Organization)
  removeOrganization(@Args('id', { type: () => Int }) id: number) {
    return this.organizationService.remove(id);
  }

  @Mutation(() => Organization, { name: 'createOrganization' })
  async createOrganization(
    @Args('createOrganizationInput') createOrganizationInput: CreateOrganizationInput,
    @CurrentUser() user: User,
  ) : Promise<Organization> {
    return this.organizationService.create(createOrganizationInput, user);
  }
}
