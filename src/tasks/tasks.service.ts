import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './tasks.types';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { TaskRepository } from './task.repository';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-task-filter-dto';

@Injectable()
export class TasksService {
  constructor(private taskRepository: TaskRepository) {}

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  getTasks(filterDto: GetTasksFilterDto) {
    return this.taskRepository.getAllTask(filterDto);
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

  async getTasksByID(id: number) {
    const found = await this.taskRepository.findOne(id);
    if (!found) throw new NotFoundException(`Task with ID ${id} not found`);
    return found;
  }

  async createNewTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { description, title } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    await task.save();
    return task;
  }

  deleteTask(id: number): Promise<DeleteResult> {
    return this.taskRepository.deleteTask(id);
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTasksByID(id);
    task.status = status;
    task.save();
    return task;
  }
}
