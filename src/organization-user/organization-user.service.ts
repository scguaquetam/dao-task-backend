import { Injectable } from '@nestjs/common';
import { CreateOrganizationUserInput } from './dto/create-organization-user.input';
import { UpdateOrganizationUserInput } from './dto/update-organization-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { OrganizationUser } from './entities/organization-user.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Organization } from 'src/organization/entities/organization.entity';

@Injectable()
export class OrganizationUserService {
  constructor(
    @InjectRepository(OrganizationUser)
    private readonly orgUserRepository: Repository<OrganizationUser>,
  ) {}

  async create(
    createOrganizationUserInput: CreateOrganizationUserInput,
    user : User,
    organization : Organization
  ): Promise<OrganizationUser> {
    const newOrgUser = this.orgUserRepository.create({
      ...createOrganizationUserInput,
      user,
      organization
    });
    return await this.orgUserRepository.save(newOrgUser);
  }

  async findUserRoleByOrgAndUser(orgId: string, userId: string): Promise<string | undefined> {
    const orgUser = await this.orgUserRepository
      .createQueryBuilder('orgUser')
      .where('orgUser.user_id = :userId', { userId })
      .andWhere('orgUser.organization_id = :orgId', { orgId })
      .getOne();

    return orgUser?.role;
  }

  async findOrganizationsByUser(userId: string): Promise<Organization[]> {
    return this.orgUserRepository
      .createQueryBuilder('orgUser')
      .innerJoinAndSelect('orgUser.organization', 'organization')
      .where('orgUser.user_id = :userId', { userId })
      .select('organization.*')
      .getRawMany();
  }







  findAll() {
    return `This action returns all organizationUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationUser`;
  }

  update(id: number, updateOrganizationUserInput: UpdateOrganizationUserInput) {
    return `This action updates a #${id} organizationUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationUser`;
  }
}
