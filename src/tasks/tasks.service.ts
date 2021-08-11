import { Injectable } from '@nestjs/common';
import { status, Task } from './tasks.model';
import { v4 } from 'uuid';
import { CreateTaskDto } from './DTO/create-tasks.dto';
import { GetTasksFilterDto } from './DTO/get-task-filter-dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTasksFilterDto(filterDto: GetTasksFilterDto) {
    let tasks: Task[] = this.getAllTasks();
    const { search, status } = filterDto;
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.description.includes(search) || task.title.includes(search),
      );
    }
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    return tasks;
  }
  getTasksByID(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createNewTask(createTaskDto: CreateTaskDto) {
    const { description, title } = createTaskDto;
    const task: Task = {
      title,
      description,
      id: v4(),
      status: status.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): Task[] {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return this.tasks;
  }

  updateTaskStatus(id: string, status: status) {
    const task = this.getTasksByID(id);
    task.status = status;
    return task;
  }
}
