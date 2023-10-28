import { Injectable } from '@nestjs/common';
import { CreateOrganizationInput } from './dto/inputs/create-organization.input';
import { UpdateOrganizationInput } from './dto/inputs/update-organization.input';
import { User } from 'src/users/entities/user.entity';
import { Organization } from './entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private readonly orgRepository: Repository<Organization>,
  ) {}

  async create(
    createOrganizationInput: CreateOrganizationInput,
    user: User,
  ): Promise<Organization> {
    const newOrg = this.orgRepository.create(createOrganizationInput);
    newOrg.users = [user];
    return await this.orgRepository.save(newOrg);
  }

  findAll() {
    return `This action returns all organization`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`;
  }

  update(id: number, updateOrganizationInput: UpdateOrganizationInput) {
    return `This action updates a #${id} organization`;
  }

  remove(id: number) {
    return `This action removes a #${id} organization`;
  }

  async findByUser(
    user: User
  ): Promise<Organization[]> {
    return await this.orgRepository
      .createQueryBuilder('organization')
      .innerJoin('organization.users', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getMany();
  }
}
