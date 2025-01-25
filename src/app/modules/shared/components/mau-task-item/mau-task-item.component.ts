import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';

import { TProcessChip } from '../mau-chip/types/mau-chip.types';
import { EMenuOptions } from '../mau-menu-options/enums/mau.menu-options.enums';

@Component({
  selector: 'mau-task-item',
  templateUrl: './mau-task-item.component.html',
  styleUrls: ['./mau-task-item.component.scss'],
  standalone: false
})
export class MauTaskItemComponent implements OnInit {
  idTask = input.required<number>();
  title = input.required<string>();
  dateExpire = input.required<Date>();
  processTask = input.required<TProcessChip>();
  optionSelected = input.required<EMenuOptions | null>();

  @Output() taskSelected = new EventEmitter<number>();

  date: string = '';

  constructor() { }

  ngOnInit() {}

  itemTaskSelected(e: any) {
    this.taskSelected.emit(e.target.value());
  }

  itemTaskToEdit() {
    this.taskSelected.emit(this.idTask());
  }
}
