import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTaskDto } from './DTO/create-tasks.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTasksByID(@Param('id') id: string): Task {
    return this.taskService.getTasksByID(id);
  }

  @Post()
  createNewTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createNewTask(createTaskDto);
  }
}
