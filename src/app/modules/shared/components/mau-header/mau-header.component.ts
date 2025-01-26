import { Component, effect, EventEmitter, input, OnInit, Output, signal } from '@angular/core';

import { IMauMenuOption } from '../mau-menu-options/interfaces/mau-menu-options.interface';
import { EMenuOptionsDefault } from '../mau-menu-options/enums/mau.menu-options.enums';

@Component({
  selector: 'mau-header',
  templateUrl: './mau-header.component.html',
  styleUrls: ['./mau-header.component.scss'],
  standalone: false
})
export class MauHeaderComponent implements OnInit {
  menuOptions = input<IMauMenuOption[]>([]);
  isMenuOpen = input<boolean>();
  isShownIconTrash = input<boolean>(false);
  isBackButtonShown = input<boolean>(false);

  @Output() optionSelected = new EventEmitter<EMenuOptionsDefault>();
  @Output() removeElements = new EventEmitter();
  @Output() backButton = new EventEmitter();
  @Output() menuOpened = new EventEmitter<boolean>();

  isShownMenu = signal<boolean>(false);

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
  }

  removeOption(): void {
    this.removeElements.emit();
  }

  backButtonAction(): void {
    this.backButton.emit();
  }
}
