import { EMenuOptions } from '../enums/mau.menu-options.enums';

export interface IMauMenuOption {
  optionName: string;
  iconName: string;
  action: EMenuOptions;
  url?: string;
}