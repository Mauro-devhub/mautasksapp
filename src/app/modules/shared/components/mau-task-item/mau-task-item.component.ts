import { Component, computed, effect, EventEmitter, input, OnInit, Output, signal } from '@angular/core';

import { EMenuOptionsDefault, EMenuOptionsState } from '../mau-menu-options/enums/mau.menu-options.enums';
import { IMauMenuOption } from '../mau-menu-options/interfaces/mau-menu-options.interface';
import { TMenu } from '../mau-menu-options/types/mau-menu.types';
import { isBeforeUtils } from '../../utils/date.utils';
import { EProcessChip } from '../mau-chip/enums/mau-chip.enums';

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
  processTask = input.required<EProcessChip>();
  optionSelected = input.required<EMenuOptionsDefault | null>();
  
  menuOptionsItem = input<IMauMenuOption[]>([]);
  isShownMenu = signal<boolean>(false);
  
  process = computed(() => this.processTask());
  menu = computed<IMauMenuOption[]>(() => this.menuOptionsItem());

  @Output() taskSelected = new EventEmitter<number>();
  @Output() optionMenuSelected = new EventEmitter<{id: number, option: TMenu}>();

  date: string = '';

  constructor() { 
    effect(() => {
      this.process = computed(() => this.validationDate());

      if (this.process() === EProcessChip.EXPIRED) {
        this.menu = computed(() => this.menuOptionsItem().filter((e) => e.action == EMenuOptionsDefault.DELETE));
      }
      if (this.process() === EProcessChip.DONE) {
        this.menu = computed(() => this.menuOptionsItem().filter((e) => e.action !== EMenuOptionsDefault.DELETE && e.action !== EMenuOptionsState.DONE));
      }
      if (this.process() === EProcessChip.DONE && isBeforeUtils(new Date(this.dateExpire()), new Date())) {
        this.menu = computed(() => this.menuOptionsItem().filter((e) => e.action == EMenuOptionsDefault.DELETE));
      }
      if (this.process() === EProcessChip.PENDING) {
        this.menu = computed(() => this.menuOptionsItem().filter((e) => e.action !== EMenuOptionsDefault.DELETE && e.action !== EMenuOptionsState.PENDING));
      }
    })
  }

  ngOnInit() {}

  optionMenuItemSelected(e: IMauMenuOption): void {
    this.optionMenuSelected.emit({id: this.idTask(), option: e.action});
    this.buttonToggleMenu();
  }

  buttonToggleMenu(): void {
    this.isShownMenu.set(!this.isShownMenu());
  }

  itemTaskSelected(e: any): void {
    this.taskSelected.emit(e.target.value());
  }

  backdropClicked(e: any): void {
    this.isShownMenu.set(false);
  }

  itemTaskToEdit(): void {
    this.taskSelected.emit(this.idTask());
  }

  validationDate(): EProcessChip {
    if (this.processTask() === EProcessChip.DONE && isBeforeUtils(new Date(this.dateExpire()), new Date())) {
      return this.processTask();
    }

    if (isBeforeUtils(new Date(this.dateExpire()), new Date())) {
      return EProcessChip.EXPIRED;
    };

    return this.processTask();
  }
}
