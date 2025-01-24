import { Component, signal } from '@angular/core';

import { IMauMenuOption } from '../shared/components/mau-menu-options/interfaces/mau-menu-options.interface';
import { EMenuOptions } from '../shared/components/mau-menu-options/enums/mau.menu-options.enums';
import { ITasks } from '../shared/components/mau-task-list/interfaces/mau-tasks-list.interfaces';
import { MENU_OPTIONS } from '../shared/contants/menu-options.constants';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  isMenuOpen = signal<boolean>(false);
  message = 'list tasks empty, add few tasks on menu option ( create task )';
  
  menuOptions: IMauMenuOption[] = MENU_OPTIONS;

  tasks: ITasks[] = [
    {
      title: 'Mauricio',
      dateExpire: new Date('12/12/12'),
      processTask: 'done'
    },
    {
      title: 'Mauricio',
      dateExpire: new Date('12/12/12'),
      processTask: 'done'
    },
    {
      title: 'Mauricio',
      dateExpire: new Date('12/12/12'),
      processTask: 'done'
    }
  ]

  constructor() { }

  backdropClicked(e: any) {
    this.isMenuOpen.set(false);
  }

  menuOpened(e: boolean) {
    this.isMenuOpen.set(e);
  }

  optionMenuSelected(e: EMenuOptions) {
    this.isMenuOpen.set(false);
  }
}