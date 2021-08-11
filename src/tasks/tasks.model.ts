export interface Task {
  id: string;
  title: string;
  description: string;
  status: status;
}

export enum status {
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  OPEN = 'OPEN',
}
