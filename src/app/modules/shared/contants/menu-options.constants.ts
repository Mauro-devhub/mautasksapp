import { ECustomOptions, EMenuOptionsDefault, EMenuOptionsState } from '../components/mau-menu-options/enums/mau.menu-options.enums';
import { IMauMenuOption } from '../components/mau-menu-options/interfaces/mau-menu-options.interface';
import { NAVIGATE_URL } from '../enums/navigate-url.enum';

export const MENU_OPTIONS: IMauMenuOption[] = [
  {
    optionName: 'Create task',
    iconName: 'add',
    action: EMenuOptionsDefault.CREATE,
    url: NAVIGATE_URL.CREATE_TASK
  },
  {
    optionName: 'Edit task',
    iconName: 'create-outline',
    action: EMenuOptionsDefault.EDIT,
    url: NAVIGATE_URL.EDIT_TASK
  },
  {
    optionName: 'Remove task',
    iconName: 'trash-outline',
    action: EMenuOptionsDefault.DELETE
  }
];

export const MENU_OPTIONS_TASK: IMauMenuOption[] = [
  {
    optionName: 'DONE',
    iconName: 'add',
    action: EMenuOptionsState.DONE
  },
  {
    optionName: 'PENDING',
    iconName: 'create-outline',
    action: EMenuOptionsState.PENDING,
  },
  {
    optionName: 'REMOVE',
    iconName: 'create-outline',
    action: EMenuOptionsDefault.DELETE,
  }
];

export const MENU_OPTIONS_SEARCH_BAR: IMauMenuOption[] = [
  {
    optionName: ECustomOptions.EXP_DATE_ASC,
    action: EMenuOptionsDefault.FILTER
  },
  {
    optionName: ECustomOptions.EXP_DATE_DESC,
    action: EMenuOptionsDefault.FILTER
  },
  {
    optionName: EMenuOptionsState.DONE,
    hasChip: true,
    action: EMenuOptionsDefault.FILTER
  },
  {
    optionName: EMenuOptionsState.PENDING,
    hasChip: true,
    action: EMenuOptionsDefault.FILTER
  },
  {
    optionName: EMenuOptionsState.EXPIRED,
    hasChip: true,
    action: EMenuOptionsDefault.FILTER
  },
  {
    optionName: ECustomOptions.SHOW_ALL,
    action: EMenuOptionsDefault.FILTER
  }
];