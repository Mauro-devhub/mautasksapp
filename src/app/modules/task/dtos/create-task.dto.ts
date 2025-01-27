import { EStateTask } from '../../shared/components/mau-chip/enums/mau-chip.enums';

export class CreateTaskDTO {
  title!: string;
  description!: string;
  dateExpire!: string;
  stateTask!: EStateTask;
}