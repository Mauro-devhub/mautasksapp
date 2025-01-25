import { TProcessChip } from "../../mau-chip/types/mau-chip.types";

export interface ITasks {
  id: number;
  title: string;
  dateExpire: Date;
  processTask: TProcessChip;
}