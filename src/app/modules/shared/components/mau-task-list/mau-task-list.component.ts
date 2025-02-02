import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';

import { ITask } from './interfaces/mau-tasks-list.interfaces';
import { EMenuOptionsDefault } from '../mau-menu-options/enums/mau.menu-options.enums';
import { IMauMenuOption } from '../mau-menu-options/interfaces/mau-menu-options.interface';
import { TMenu } from '../mau-menu-options/types/mau-menu.types';
import { EStateTask } from '../mau-chip/enums/mau-chip.enums';

@Component({
  selector: 'mau-task-list',
  templateUrl: './mau-task-list.component.html',
  styleUrls: ['./mau-task-list.component.scss'],
  standalone: false
})
export class MauTaskListComponent implements OnInit {
  optionSelected = input.required<EMenuOptionsDefault | null>();
  tasks = input.required<ITask[]>();

  menuOptions = input<IMauMenuOption[]>([]);
  isMenuTaskOpen = input<boolean>(false);
  
  @Output() taskSelected = new EventEmitter<{id: number, action: EStateTask | null}>();
  @Output() taskChangeState = new EventEmitter<{id: number, option: TMenu}>();

  constructor() { }

  ngOnInit() {}

  itemTaskSelected(e: {id: number, action: EStateTask | null}): void {
    this.taskSelected.emit(e);
  }

  optionMenuSelected(task: {id: number, option: TMenu}): void {
    this.taskChangeState.emit(task);
  }

}
