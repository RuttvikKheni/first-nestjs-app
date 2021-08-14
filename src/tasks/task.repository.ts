import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { GetTasksFilterDto } from './dto/get-task-filter-dto';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getAllTask(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });
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
