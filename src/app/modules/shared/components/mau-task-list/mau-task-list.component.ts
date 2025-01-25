import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';

import { ITasks } from './interfaces/mau-tasks-list.interfaces';
import { EMenuOptions } from '../mau-menu-options/enums/mau.menu-options.enums';

@Component({
  selector: 'mau-task-list',
  templateUrl: './mau-task-list.component.html',
  styleUrls: ['./mau-task-list.component.scss'],
  standalone: false
})
export class MauTaskListComponent implements OnInit {
  optionSelected = input.required<EMenuOptions | null>();
  tasks = input.required<ITasks[]>();
  
  @Output() taskSelected = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {}

  itemTaskSelected(e: number) {
    this.taskSelected.emit(e);
  }

}
