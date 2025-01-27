import { EStateTask } from '../../mau-chip/enums/mau-chip.enums';

export interface ITask {
  id: number;
  title: string;
  dateExpire: string;
  stateTask: EStateTask;
}