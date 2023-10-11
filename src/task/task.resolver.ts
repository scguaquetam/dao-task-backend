import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput, UpdateTaskInput } from './dto/inputs';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task)
  async createTask
    (@Args('createTaskInput') createTaskInput: CreateTaskInput
  ) : Promise<Task> {
    return this.taskService.create(createTaskInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  async findAll() : Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Query(() => Task, { name: 'task' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string
  ) : Promise<Task> {
    return this.taskService.findOne(id);
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('updateTaskInput') updateTaskInput: UpdateTaskInput
  ) : Promise<Task> {
    return this.taskService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => Task)
  removeTask
    (@Args('id', { type: () => ID }) id: string
  ) {
    return this.taskService.remove(id);
  }
}
