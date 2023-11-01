import { Injectable } from '@nestjs/common';
import { CreateOrganizationInput } from './dto/inputs/create-organization.input';
import { UpdateOrganizationInput } from './dto/inputs/update-organization.input';
import { User } from 'src/users/entities/user.entity';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrganizationUserService } from 'src/organization-user/organization-user.service';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepository: Repository<Organization>,
    private readonly organizationUserService: OrganizationUserService,
  ) {}
  async create(
    createOrganizationInput: CreateOrganizationInput,
    user: User,
  ): Promise<Organization> {
    const newOrg = this.orgRepository.create(createOrganizationInput);
    newOrg.moderatorsNumber = 1;
    const savedOrg = await this.orgRepository.save(newOrg);
    const newOrgUser = await this.organizationUserService.create(
      { role: 'admin', nickname: user.nickname },
      user,
      savedOrg,
    );
    console.log(newOrgUser);

    return savedOrg;
  }

  async findAll(): Promise<Organization[]> {
    return await this.orgRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  async findOneByIdAndUser(
    id: string,
    user: User,
  ): Promise<Organization | undefined> {
    return await this.orgRepository
      .createQueryBuilder('organization')
      .innerJoin('organization.organizationUsers', 'orgUser') // Join con OrganizationUser primero
      .innerJoin('orgUser.user', 'user') // Luego unir con User a través de OrganizationUser
      .where('organization.id = :orgId', { orgId: id })
      .andWhere('user.id = :userId', { userId: user.id })
      .getOne();
  }
  async findOrganizationById(id: string): Promise<Organization> {
    try {
      return await this.orgRepository.findOneByOrFail({id})
    } catch (error) {
      throw new Error(`Organization with ID ${id} not found`);
    }
  }
  update(id: number, updateOrganizationInput: UpdateOrganizationInput) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }

  async findByUser(user: User): Promise<Organization[]> {
    return await this.orgRepository
      .createQueryBuilder('organization')
      .innerJoin('organization.users', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getMany();
  }
}
