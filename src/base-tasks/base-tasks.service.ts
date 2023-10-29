import { Injectable } from '@nestjs/common';
import { CreateBaseTaskInput } from './dto/create-base-task.input';
import { UpdateBaseTaskInput } from './dto/update-base-task.input';

@Injectable()
export class BaseTasksService {
  create(createBaseTaskInput: CreateBaseTaskInput) {
    return 'This action adds a new baseTask';
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
