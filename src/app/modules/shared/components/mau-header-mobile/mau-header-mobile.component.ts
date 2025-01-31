import { Component, effect, EventEmitter, input, OnInit, Output, signal } from '@angular/core';

import { EMenuOptionsDefault } from '../mau-menu-options/enums/mau.menu-options.enums';
import { IMauMenuOption } from '../mau-menu-options/interfaces/mau-menu-options.interface';

@Component({
  selector: 'mau-header-mobile',
  templateUrl: './mau-header-mobile.component.html',
  styleUrls: ['./mau-header-mobile.component.scss'],
  standalone: false
})
export class MauHeaderMobileComponent implements OnInit {
  menuOptions = input<IMauMenuOption[]>([]);
  isMenuOpen = input<boolean>();
  isShownIconTrash = input<boolean>(false);
  isBackButtonShown = input<boolean>(false);

  @Output() optionSelected = new EventEmitter<EMenuOptionsDefault>();
  @Output() removeElements = new EventEmitter();
  @Output() backButton = new EventEmitter();
  @Output() menuOpened = new EventEmitter<boolean>();

  isShownMenu = signal<boolean>(true);

  constructor() { 
    effect(() => {
      if (this.isMenuOpen() == false) {
        this.isShownMenu.set(false);
      }
    })
  }

  ngOnInit() {}

  buttonToggleMenu(): void {
    this.isShownMenu.set(!this.isShownMenu());
    this.menuOpened.emit(this.isShownMenu());
  }

  optionMenuSelected(e: IMauMenuOption): void {
    this.optionSelected.emit(e.action as EMenuOptionsDefault);
    this.isShownMenu.set(!this.isShownMenu());
  }

  removeOption(): void {
    this.removeElements.emit();
  }

  backButtonAction(): void {
    this.backButton.emit();
  }
}
