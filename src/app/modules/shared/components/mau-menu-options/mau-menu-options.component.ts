import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';

import { IMauMenuOption } from './interfaces/mau-menu-options.interface';

@Component({
  selector: 'mau-menu-options',
  templateUrl: './mau-menu-options.component.html',
  styleUrls: ['./mau-menu-options.component.scss'],
  standalone: false
})
export class MauMenuOptionsComponent implements OnInit {
  menuOptions = input.required<IMauMenuOption[]>();

  @Output() setOptionSelected = new EventEmitter<IMauMenuOption>();

  constructor() { }

  ngOnInit() {}

  optionSelected(optionAction: IMauMenuOption): void {
    this.setOptionSelected.emit(optionAction);
  }

}
