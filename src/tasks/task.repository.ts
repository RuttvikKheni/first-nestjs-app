import { EntityRepository, Repository } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-task-filter-dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getAllTask(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'task.title  LIKE :search OR task.description LIKE :search',
        { search: `%${search}%` },
      );
    }
    return await query.getMany();
  }

  deleteTask(id: number) {
    return this.delete(id);
  }
}
