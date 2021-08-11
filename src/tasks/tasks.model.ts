export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'DONE' | 'IN_PROGRESS' | 'OPEN';
}
