import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-task-filter-dto';
import { TaskStatusVelidatorPipe } from './pipes/task-status-validator.pipe';
import { status, Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length)
      return this.taskService.getTasksFilterDto(filterDto);
    else return this.taskService.getAllTasks();
  }

  @Get('/:id')
  getTasksByID(@Param('id') id: string): Task {
    return this.taskService.getTasksByID(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createNewTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createNewTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Task[] {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/:status')
  updateTaskStatus(
    @Param('id') id: string,
    @Param('status', TaskStatusVelidatorPipe) Status: status,
  ): Task {
    return this.taskService.updateTaskStatus(id, Status);
  }
}
