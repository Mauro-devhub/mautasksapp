import { TProcessChip } from "../../mau-chip/types/mau-chip.types";

export interface ITasks {
  title: string;
  dateExpire: Date;
  processTask: TProcessChip;
}