import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { User } from 'src/users/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput, UpdateTaskInput } from './dto/inputs';

@Resolver(() => Task)
@UseGuards(JwtAuthGuard)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => Task, { name: 'createTask' })
  async createTask
    (@Args('createTaskInput') createTaskInput: CreateTaskInput,
    @CurrentUser() user: User
  ) : Promise<Task> {
    return this.taskService.create(createTaskInput, user);
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
