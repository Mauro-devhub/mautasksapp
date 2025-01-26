import { EProcessChip } from '../../mau-chip/enums/mau-chip.enums';

export interface ITasks {
  id: number;
  title: string;
  dateExpire: string;
  processTask: EProcessChip;
}