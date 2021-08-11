import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { status } from '../tasks.model';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([status.OPEN, status.IN_PROGRESS, status.DONE])
  status: status;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
