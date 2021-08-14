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
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.taskService.getTasks(filterDto, user);
  }

  @Get('/:id')
  getTasksByID(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Task> {
    return this.taskService.getTasksByID(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createNewTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.taskService.createNewTask(createTaskDto, user);
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
    @GetUser() user: User,
    @Param('status', TaskStatusVelidatorPipe) Status: TaskStatus,
  ): Promise<Task> {
    return this.taskService.updateTaskStatus(id, Status, user);
  }
}
