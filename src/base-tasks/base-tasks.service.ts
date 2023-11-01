import { Injectable } from '@nestjs/common';
import { CreateBaseTaskInput } from './dto/create-base-task.input';
import { UpdateBaseTaskInput } from './dto/update-base-task.input';
import { BaseTask } from './entities/base-task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Organization } from 'src/organization/entities/organization.entity';
import { OrganizationService } from '../organization/organization.service';

@Injectable()
export class BaseTasksService {
  constructor(
    @InjectRepository(BaseTask)
    private readonly baseTaskRepository: Repository<BaseTask>,
    private readonly organizationService: OrganizationService,
  ) {}

  async create(createBaseTaskInput: CreateBaseTaskInput): Promise<BaseTask> {

    const organization = await this.organizationService.findOrganizationById(createBaseTaskInput.organizationId);

    const newBaseTask = this.baseTaskRepository.create({
      ...createBaseTaskInput,
      organization,
    });
    return await this.baseTaskRepository.save(newBaseTask);
  }

  findAll() {
    return `This action returns all baseTasks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} baseTask`;
  }

  update(id: number, updateBaseTaskInput: UpdateBaseTaskInput) {
    return `This action updates a #${id} baseTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} baseTask`;
  }
}
