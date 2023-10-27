import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskInput, UpdateTaskInput } from './dto/inputs';
import { Task } from './entities/task.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TaskService {
  
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task> 
  ){}

  async create(createTaskInput: CreateTaskInput, user: User) : Promise<Task>{
    const newTask = this.taskRepository.create(createTaskInput)
    return await this.taskRepository.save(newTask)
  }

  findAll() : Promise<Task[]> {
    //TODO pagination
    return this.taskRepository.find()
  }

  async findOne(id: string) : Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);

    return task;
  }

  async update(id: string, updateTaskInput: UpdateTaskInput) : Promise<Task> {
    const task = await this.taskRepository.preload(updateTaskInput)
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);

    return this.taskRepository.save(task)
  }

  async remove(id: string) {
    //Soft delete and check integrity referential
    const item = await this.findOne(id)
    await this.taskRepository.remove(item)
    return {...item, id}
  }
}
