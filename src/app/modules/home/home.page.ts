import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { IMauMenuOption } from '../shared/components/mau-menu-options/interfaces/mau-menu-options.interface';
import { EMenuOptions } from '../shared/components/mau-menu-options/enums/mau.menu-options.enums';
import { ITasks } from '../shared/components/mau-task-list/interfaces/mau-tasks-list.interfaces';
import { MENU_OPTIONS } from '../shared/contants/menu-options.constants';
import { NAVIGATE_URL } from '../shared/enums/navigate-url.enum';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  route = inject(Router);

  isMenuOpen = signal<boolean>(false);
  tasksToRemove = signal<number[]>([]);
  isShownIconTrash = signal<boolean>(false);
  optionSelected = signal<EMenuOptions | null>(null);
  isBackButtonShown = signal<boolean>(false);

  message = 'list tasks empty, add few tasks on menu option ( create task )';
  
  menuOptions: IMauMenuOption[] = MENU_OPTIONS;

  tasks: ITasks[] = [
    {
      id: 1,
      title: 'Mauricio',
      dateExpire: new Date('12/12/12'),
      processTask: 'done'
    },
    {
      id: 2,
      title: 'Mauricio',
      dateExpire: new Date('12/12/12'),
      processTask: 'done'
    },
    {
      id: 3,
      title: 'Mauricio',
      dateExpire: new Date('12/12/12'),
      processTask: 'done'
    }
  ]

  constructor() { }

  backdropClicked(e: any) {
    this.isMenuOpen.set(false);
  }

  menuOpened(e: boolean) {
    this.isShownIconTrash.set(false);
    this.optionSelected.set(null);
    this.isBackButtonShown.set(false);
    this.isMenuOpen.set(e);
    if (this.tasksToRemove().length > 0) {
      this.tasksToRemove.set([]);
    }
  }

  optionMenuSelected(e: EMenuOptions) {
    if (e == EMenuOptions.DELETE) {
      this.isBackButtonShown.set(true);
    }
    if (e == EMenuOptions.EDIT) {
      this.isBackButtonShown.set(true);
    }
    if (e == EMenuOptions.CREATE) {
      this.route.navigateByUrl(`${NAVIGATE_URL.CREATE_TASK}`);
    }
    this.optionSelected.set(e);
    this.isMenuOpen.set(false);
  }

  taskSelected(e: number) {
    if (this.isBackButtonShown() && this.optionSelected() == EMenuOptions.EDIT) {
      this.route.navigateByUrl(`${NAVIGATE_URL.EDIT_TASK}/${e}`);
      this.isBackButtonShown.set(false);
      this.optionSelected.set(null);
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

  removeItemTasks() {
    this.tasks = [...this.tasks.filter((e) => !this.tasksToRemove().includes(e.id))];
    this.tasksToRemove.set([]);
    this.isShownIconTrash.set(false);
    this.optionSelected.set(null);
    this.isBackButtonShown.set(false);
  }
}