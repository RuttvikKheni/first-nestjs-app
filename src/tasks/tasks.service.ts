import { Injectable } from '@nestjs/common';
import { Task } from './tasks.model';
import { v4 } from 'uuid';
import { CreateTaskDto } from './DTO/create-tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
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
      status: 'OPEN',
    };
    this.tasks.push(task);
    return task;
  }
}
