import { EMenuOptions } from '../components/mau-menu-options/enums/mau.menu-options.enums';
import { IMauMenuOption } from '../components/mau-menu-options/interfaces/mau-menu-options.interface';

export const MENU_OPTIONS: IMauMenuOption[] = [
  {
    optionName: 'Create task',
    iconName: 'add',
    action: EMenuOptions.CREATE
  },
  {
    optionName: 'Edit task',
    iconName: 'create-outline',
    action: EMenuOptions.UPDATE
  },
  {
    optionName: 'Remove task',
    iconName: 'trash-outline',
    action: EMenuOptions.DELETE
  }
];