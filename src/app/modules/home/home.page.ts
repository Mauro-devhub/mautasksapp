import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { IMauMenuOption } from '../shared/components/mau-menu-options/interfaces/mau-menu-options.interface';
import { EMenuOptionsDefault } from '../shared/components/mau-menu-options/enums/mau.menu-options.enums';
import { ITasks } from '../shared/components/mau-task-list/interfaces/mau-tasks-list.interfaces';
import { MENU_OPTIONS, MENU_OPTIONS_TASK } from '../shared/contants/menu-options.constants';
import { NAVIGATE_URL } from '../shared/enums/navigate-url.enum';
import { TProcessChip } from '../shared/components/mau-chip/types/mau-chip.types';
import { TMenu } from '../shared/components/mau-menu-options/types/mau-menu.types';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  route = inject(Router);

  isMenuOpen = signal<boolean>(false);
  isShownIconTrash = signal<boolean>(false);
  optionSelected = signal<EMenuOptionsDefault | null>(null);
  isBackButtonShown = signal<boolean>(false);
  
  tasksToRemove = signal<number[]>([]);
  tasksToComplete = signal<number[]>([]);

  message: string = 'list tasks empty, add few tasks on menu option ( create task )';
  
  menuOptions: IMauMenuOption[] = MENU_OPTIONS;
  menuOptionsTask: IMauMenuOption[] = MENU_OPTIONS_TASK;

  tasks: ITasks[] = [
    {
      id: 1,
      title: 'Mauricio',
      dateExpire: new Date('12/12/15'),
      processTask: 'done'
    },
    {
      id: 2,
      title: 'Mauricio',
      dateExpire: new Date('12/12/12'),
      processTask: 'expired'
    },
    {
      id: 3,
      title: 'Mauricio',
      dateExpire: new Date('12/12/25'),
      processTask: 'pending'
    }
  ]

  constructor() { }

  backdropClicked(e: any): void {
    this.isMenuOpen.set(false);
  }

  menuOpened(e: boolean): void {
    this.isShownIconTrash.set(false);
    this.optionSelected.set(null);
    this.isBackButtonShown.set(false);
    this.isMenuOpen.set(e);
    if (this.tasksToRemove().length > 0) {
      this.tasksToRemove.set([]);
    }
  }

  optionMenuSelected(e: EMenuOptionsDefault): void {
    if (e == EMenuOptionsDefault.DELETE) {
      this.isBackButtonShown.set(true);
    }
    if (e == EMenuOptionsDefault.EDIT) {
      this.isBackButtonShown.set(true);
    }
    if (e == EMenuOptionsDefault.CREATE) {
      this.route.navigateByUrl(`${NAVIGATE_URL.CREATE_TASK}`);
      this.isMenuOpen.set(false);
      return;
    }
    this.optionSelected.set(e);
    this.isMenuOpen.set(false);
  }

  taskSelected(e: number): void {
    if (this.isBackButtonShown() && this.optionSelected() == EMenuOptionsDefault.EDIT) {
      this.route.navigateByUrl(`${NAVIGATE_URL.EDIT_TASK}/${e}`);
      this.isBackButtonShown.set(false);
      this.optionSelected.set(null);
      return;
    }

    if (this.optionSelected() == null) {
      return;
    }

    if (!this.tasksToRemove().includes(e)) {
      const taskToRemove = [...this.tasksToRemove(), e];
      this.tasksToRemove.set(taskToRemove);
    } else {
      const taskToRemove = this.tasksToRemove().filter((prev) => prev !== e);
      this.tasksToRemove.set(taskToRemove);
    }

    if (this.tasksToRemove().length > 0) {
      this.isBackButtonShown.set(false);
    } else {
      this.isBackButtonShown.set(true);
    }
  }

  taskChangeState(task: {id: number, option: TMenu}): void {
    if (task.option === EMenuOptionsDefault.DELETE) {
      this.tasks = this.tasks.filter((e) => e.id !== task.id);
    }

    this.tasks = this.tasks.map((e) => {
      if (e.id === task.id) {
        return {...e, processTask: task.option.toLowerCase() as TProcessChip}
      }

      return e;
    })
  }

  removeItemTasks(): void {
    this.tasks = [...this.tasks.filter((e) => !this.tasksToRemove().includes(e.id))];
    this.tasksToRemove.set([]);
    this.isShownIconTrash.set(false);
    this.optionSelected.set(null);
    this.isBackButtonShown.set(false);
  }
}