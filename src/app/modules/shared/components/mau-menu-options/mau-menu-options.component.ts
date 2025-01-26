import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';

import { IMauMenuOption } from './interfaces/mau-menu-options.interface';
import { TMenu } from './types/mau-menu.types';

@Component({
  selector: 'mau-menu-options',
  templateUrl: './mau-menu-options.component.html',
  styleUrls: ['./mau-menu-options.component.scss'],
  standalone: false
})
export class MauMenuOptionsComponent implements OnInit {
  menuOptions = input.required<IMauMenuOption[]>();

  @Output() setOptionSelected = new EventEmitter<TMenu>();

  constructor() { }

  ngOnInit() {}

  optionSelected(optionAction: TMenu): void {
    this.setOptionSelected.emit(optionAction);
  }

}
