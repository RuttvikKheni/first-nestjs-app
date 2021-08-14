import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.types';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-task-filter-dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  getTasks(filterDto: GetTasksFilterDto, user: User) {
    return this.taskRepository.getAllTask(filterDto, user);
  }

  // getTasksFilterDto(filterDto: GetTasksFilterDto): Promise<Task[]> {
  //   const { search, status } = filterDto;
  //   let tasks = this.taskRepository.find({ where: { state: status } });
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.description.includes(search) || task.title.includes(search),
  //     );
  //   }
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   return tasks;
  // }

  async getTasksByID(id: number, user: User) {
    const found = await this.taskRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) throw new NotFoundException(`Task with ID ${id} not found`);
    return found;
  }

  async createNewTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { description, title } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    await task.save();
    delete task.user;
    return task;
  }

  deleteTask(id: number, user: User): Promise<DeleteResult> {
    return this.taskRepository.deleteTask(id, user);
  }

  async updateTaskStatus(
    id: number,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTasksByID(id, user);
    task.status = status;
    task.save();
    return task;
  }
}
