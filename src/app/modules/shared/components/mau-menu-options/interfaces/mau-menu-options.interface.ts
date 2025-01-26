import { TMenu } from '../types/mau-menu.types';

export interface IMauMenuOption {
  optionName: string;
  iconName: string;
  action: TMenu;
  url?: string;
}