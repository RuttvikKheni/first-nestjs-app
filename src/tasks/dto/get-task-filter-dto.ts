import { status } from '../tasks.model';

export class GetTasksFilterDto {
  status: status;
  search: string;
}
