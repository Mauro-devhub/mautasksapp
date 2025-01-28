import { Component, computed, effect, EventEmitter, inject, input, OnInit, Output, signal } from '@angular/core';

import { EMenuOptionsDefault, EMenuOptionsState } from '../mau-menu-options/enums/mau.menu-options.enums';
import { IMauMenuOption } from '../mau-menu-options/interfaces/mau-menu-options.interface';
import { TMenu } from '../mau-menu-options/types/mau-menu.types';
import { isBeforeUtils } from '../../utils/date.utils';
import { EStateTask } from '../mau-chip/enums/mau-chip.enums';
import { TaskService } from 'src/app/modules/task/services/task.service';

@Component({
  selector: 'mau-task-item',
  templateUrl: './mau-task-item.component.html',
  styleUrls: ['./mau-task-item.component.scss'],
  standalone: false
})
export class MauTaskItemComponent implements OnInit {
  idTask = input.required<number>();
  title = input.required<string>();
  dateExpire = input.required<string>();
  stateTask = input.required<EStateTask>();
  optionSelected = input.required<EMenuOptionsDefault | null>();
  menuOptionsItem = input<IMauMenuOption[]>([]);
  
  isShownMenu = signal<boolean>(false);
  
  state = computed(() => this.stateTask());
  menu = computed<IMauMenuOption[]>(() => this.menuOptionsItem());

  private taskService = inject(TaskService);

  @Output() taskSelected = new EventEmitter<{id: number, action: EStateTask | null}>();
  @Output() optionMenuSelected = new EventEmitter<{id: number, option: TMenu}>();

  date: string = '';

  constructor() { 
    effect(() => {
      this.state = computed(() => this.validationDate());

      if (this.state() === EStateTask.EXPIRED) {
        this.menu = computed(() => this.menuOptionsItem().filter((e) => e.action == EMenuOptionsDefault.DELETE));
      }

      if (this.state() === EStateTask.DONE) {
        this.menu = computed(() => this.menuOptionsItem().filter((e) => e.action !== EMenuOptionsDefault.DELETE && e.action !== EMenuOptionsState.DONE));
      }

      if (this.state() === EStateTask.DONE && isBeforeUtils(new Date(this.dateExpire()), new Date())) {
        this.menu = computed(() => this.menuOptionsItem().filter((e) => e.action == EMenuOptionsDefault.DELETE));
      }
      
      if (this.state() === EStateTask.PENDING) {
        this.menu = computed(() => this.menuOptionsItem().filter((e) => e.action !== EMenuOptionsDefault.DELETE && e.action !== EMenuOptionsState.PENDING));
      }
    })
  }

  ngOnInit() {
    if (isBeforeUtils(new Date(this.dateExpire()), new Date())) {
      this.taskService.changueStateTask(this.idTask(), EStateTask.EXPIRED);
    };
  }

  optionMenuItemSelected(e: IMauMenuOption): void {
    this.optionMenuSelected.emit({id: this.idTask(), option: e.action});
    this.isShownMenu.set(false);
  }

  buttonToggleMenu(): void {
    this.isShownMenu.set(!this.isShownMenu());
  }

  itemTaskCheckboxSelected(e: any): void {
    this.taskSelected.emit({id: e.target.value() as number, action: null});
  }

  backdropClicked(e: any): void {
    this.isShownMenu.set(false);
  }

  itemTaskSelected(): void {
    this.taskSelected.emit(
      {
        id: this.idTask(), 
        action: this.stateTask() ? this.stateTask() : null
      }
    );
  }

  validationDate(): EStateTask {
    if (this.stateTask() === EStateTask.DONE && isBeforeUtils(new Date(this.dateExpire()), new Date())) {
      return this.stateTask();
    }

    if (isBeforeUtils(new Date(this.dateExpire()), new Date())) {
      return EStateTask.EXPIRED;
    };

    return this.stateTask();
  }
}
