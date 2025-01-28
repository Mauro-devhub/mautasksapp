import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';

import { EMenuOptionsDefault } from '../mau-menu-options/enums/mau.menu-options.enums';
import { IMauMenuOption } from '../mau-menu-options/interfaces/mau-menu-options.interface';

@Component({
  selector: 'mau-mobile-header',
  templateUrl: './mau-mobile-header.component.html',
  styleUrls: ['./mau-mobile-header.component.scss'],
  standalone: false
})
export class MauMobileHeaderComponent implements OnInit {
  menuOptions = input<IMauMenuOption[]>([]);
  isMenuOpen = input<boolean>();
  isShownIconTrash = input<boolean>(false);
  isBackButtonShown = input<boolean>(false);
  
  @Output() optionSelected = new EventEmitter<EMenuOptionsDefault>();
  @Output() removeElements = new EventEmitter();
  @Output() backButton = new EventEmitter();
  @Output() menuOpened = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  menuMobileOpened(e: boolean) {
    this.menuOpened.emit(e);
  }

  optionMenuSelected(e: EMenuOptionsDefault): void {
    this.optionSelected.emit(e);
  }

  removeOption(): void {
    this.removeElements.emit();
  }

  backButtonAction(): void {
    this.backButton.emit();
  }

}
