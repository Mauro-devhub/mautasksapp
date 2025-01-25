import { EMenuOptions } from '../components/mau-menu-options/enums/mau.menu-options.enums';
import { IMauMenuOption } from '../components/mau-menu-options/interfaces/mau-menu-options.interface';
import { NAVIGATE_URL } from '../enums/navigate-url.enum';

export const MENU_OPTIONS: IMauMenuOption[] = [
  {
    optionName: 'Create task',
    iconName: 'add',
    action: EMenuOptions.CREATE,
    url: NAVIGATE_URL.CREATE_TASK
  },
  {
    optionName: 'Edit task',
    iconName: 'create-outline',
    action: EMenuOptions.EDIT,
    url: NAVIGATE_URL.EDIT_TASK
  },
  {
    optionName: 'Remove task',
    iconName: 'trash-outline',
    action: EMenuOptions.DELETE
  }
];