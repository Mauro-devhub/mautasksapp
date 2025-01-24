import { Component, effect, EventEmitter, input, OnInit, Output, signal } from '@angular/core';

import { IMauMenuOption } from '../mau-menu-options/interfaces/mau-menu-options.interface';
import { EMenuOptions } from '../mau-menu-options/enums/mau.menu-options.enums';

@Component({
  selector: 'mau-header',
  templateUrl: './mau-header.component.html',
  styleUrls: ['./mau-header.component.scss'],
  standalone: false
})
export class MauHeaderComponent implements OnInit {
  menuOptions = input<IMauMenuOption[]>([]);
  isMenuOpen = input<boolean>();

  @Output() optionSelected = new EventEmitter<EMenuOptions>();

  isShownMenu = signal<boolean>(false);

  @Output() menuOpened = new EventEmitter<boolean>();

  constructor() {
    effect(() => {
      if (this.isMenuOpen() == false) {
        this.isShownMenu.set(false);
      }
    })
  }

  ngOnInit() {}

  buttonToggleMenu() {
    this.isShownMenu.set(!this.isShownMenu());
    this.menuOpened.emit(this.isShownMenu());
  }

  optionMenuSelected(e: EMenuOptions) {
    this.optionSelected.emit(e);
  }

}
