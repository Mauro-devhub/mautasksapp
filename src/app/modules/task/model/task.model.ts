import { EStateTask } from '../../shared/components/mau-chip/enums/mau-chip.enums';

export class TaskModel {
  id!: number;
  title!: string;
  description!: string;
  dateExpire!: string;
  stateTask!: EStateTask;
}