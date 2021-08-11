import { BadRequestException, PipeTransform } from '@nestjs/common';
import { status } from '../tasks.model';

export class TaskStatusVelidatorPipe implements PipeTransform {
  readonly allowStatus = [status.DONE, status.IN_PROGRESS, status.OPEN];
  transform(value: any) {
    if (!this.isStatusIsValid(value)) {
      throw new BadRequestException(`${value} is invalid status`);
    }
    return value;
  }

  isStatusIsValid(status: status) {
    const ids = this.allowStatus.indexOf(status);
    return ids !== -1;
  }
}
