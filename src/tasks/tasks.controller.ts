import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { TaskStatusVelidatorPipe } from './pipes/task-status-validator.pipe';
import { TaskStatus } from './tasks.types';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { DeleteResult } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-task-filter-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }

  @Get('/:id')
  getTasksByID(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.taskService.getTasksByID(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createNewTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createNewTask(createTaskDto);
  }

  @Delete('/:id')
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this.taskService.deleteTask(id);
  }

  @Patch('/:id/:status')
  updateTaskStatus(
    @Param('id', ParseIntPipe) id: number,
    @Param('status', TaskStatusVelidatorPipe) Status: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, Status);
  }
}
