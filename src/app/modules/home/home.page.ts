import { Component, signal } from '@angular/core';

import { IMauMenuOption } from '../shared/components/mau-menu-options/interfaces/mau-menu-options.interface';
import { EMenuOptions } from '../shared/components/mau-menu-options/enums/mau.menu-options.enums';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  isMenuOpen = signal<boolean>(false);
  
  menuOptions: IMauMenuOption[] = [
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