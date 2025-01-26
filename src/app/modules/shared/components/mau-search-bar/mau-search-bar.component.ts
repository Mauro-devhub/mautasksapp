import { Component, EventEmitter, input, OnInit, Output, signal } from '@angular/core';

import { IMauMenuOption } from '../mau-menu-options/interfaces/mau-menu-options.interface';

@Component({
  selector: 'mau-search-bar',
  templateUrl: './mau-search-bar.component.html',
  styleUrls: ['./mau-search-bar.component.scss'],
  standalone: false
})
export class MauSearchBarComponent implements OnInit {
  placeholder = input<string>('');
  menuOptions = input<IMauMenuOption[]>([]);
  isMenuSearchBarOpen = input<boolean>();
  isShownBtnFilter = input<boolean>(false);
  
  isShownMenu = signal<boolean>(false);

  @Output() searchBarValue = new EventEmitter<string>();
  @Output() optionMenuSearchBarSelected = new EventEmitter<IMauMenuOption>();
  @Output() menuSearchBarOpened = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {}

  onChange(e: any): void {
    this.searchBarValue.emit(e.target.value as string);
  }

  buttonToggleMenu(): void {
    this.isShownMenu.set(!this.isShownMenu());
    this.menuSearchBarOpened.emit(this.isShownMenu());
  }

  backdropClicked(e: any): void {
    this.isShownMenu.set(false);
  }

  optionMenuSelected(e: IMauMenuOption): void {
    this.optionMenuSearchBarSelected.emit(e);
    this.isShownMenu.set(false);
  }
}
