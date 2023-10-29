import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BaseTasksService } from './base-tasks.service';
import { BaseTask } from './entities/base-task.entity';
import { CreateBaseTaskInput } from './dto/create-base-task.input';
import { UpdateBaseTaskInput } from './dto/update-base-task.input';

@Resolver(() => BaseTask)
export class BaseTasksResolver {
  constructor(private readonly baseTasksService: BaseTasksService) {}

  @Mutation(() => BaseTask)
  createBaseTask(@Args('createBaseTaskInput') createBaseTaskInput: CreateBaseTaskInput) {
    return this.baseTasksService.create(createBaseTaskInput);
  }

  @Query(() => [BaseTask], { name: 'baseTasks' })
  findAll() {
    return this.baseTasksService.findAll();
  }

  @Query(() => BaseTask, { name: 'baseTask' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.baseTasksService.findOne(id);
  }

  @Mutation(() => BaseTask)
  updateBaseTask(@Args('updateBaseTaskInput') updateBaseTaskInput: UpdateBaseTaskInput) {
    return this.baseTasksService.update(updateBaseTaskInput.id, updateBaseTaskInput);
  }

  @Mutation(() => BaseTask)
  removeBaseTask(@Args('id', { type: () => Int }) id: number) {
    return this.baseTasksService.remove(id);
  }
}
