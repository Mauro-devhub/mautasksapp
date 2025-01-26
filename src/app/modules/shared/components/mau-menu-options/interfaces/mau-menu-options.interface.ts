import { TMenu } from '../types/mau-menu.types';

export interface IMauMenuOption {
  optionName: string;
  iconName?: string;
  hasChip?: boolean;
  action: TMenu;
  url?: string;
}