import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.types';

export class TaskStatusVelidatorPipe implements PipeTransform {
  readonly allowStatus = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];
  transform(value: any) {
    if (!this.isStatusIsValid(value)) {
      throw new BadRequestException(`${value} is invalid status`);
    }
    return value;
  }

  isStatusIsValid(status: TaskStatus) {
    const ids = this.allowStatus.indexOf(status);
    return ids !== -1;
  }
}
