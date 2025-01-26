import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { IMauMenuOption } from '../shared/components/mau-menu-options/interfaces/mau-menu-options.interface';
import { ECustomOptions, EMenuOptionsDefault, EMenuOptionsState } from '../shared/components/mau-menu-options/enums/mau.menu-options.enums';
import { ITasks } from '../shared/components/mau-task-list/interfaces/mau-tasks-list.interfaces';
import { MENU_OPTIONS, MENU_OPTIONS_SEARCH_BAR, MENU_OPTIONS_TASK } from '../shared/contants/menu-options.constants';
import { NAVIGATE_URL } from '../shared/enums/navigate-url.enum';
import { EProcessChip } from '../shared/components/mau-chip/enums/mau-chip.enums';
import { TMenu } from '../shared/components/mau-menu-options/types/mau-menu.types';
import { ERROR_MESSAGES } from '../shared/contants/error-messages.contant';
import { filterByElement } from '../shared/utils/filters.utils';
import { formatUtils } from '../shared/utils/date.utils';

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

  message = ERROR_MESSAGES.NOT_HAS_CONTENT;
  placeholderSearchBar: string = 'search a task by title'
  
  menuOptions: IMauMenuOption[] = MENU_OPTIONS;
  menuOptionsTask: IMauMenuOption[] = MENU_OPTIONS_TASK;
  menuOptionsSearchBar: IMauMenuOption[] = MENU_OPTIONS_SEARCH_BAR;

  tasks: ITasks[] = [
    {
      id: 1,
      title: 'Mauricio',
      dateExpire: formatUtils(new Date('01/20/25')),
      processTask: EProcessChip.DONE
    },
    {
      id: 2,
      title: 'Jose',
      dateExpire: formatUtils(new Date('01/23/25')),      
      processTask: EProcessChip.EXPIRED
    },
    {
      id: 3,
      title: 'Carla',
      dateExpire: formatUtils(new Date('01/28/25')),
      processTask: EProcessChip.PENDING
    }
  ]

  tasksFilter: ITasks[] = [...this.tasks];

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

  menuSearchBarOpened(e: boolean) {
    this.isShownIconTrash.set(false);
    this.optionSelected.set(null);
    this.isBackButtonShown.set(false);
    this.isMenuOpen.set(false);
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

    this.tasksFilter = this.tasks.map((e) => {
      if (e.id === task.id) {
        return {...e, processTask: task.option as unknown as EProcessChip}
      }

      return e;
    })

    this.tasks = this.tasks.map((e) => {
      if (e.id === task.id) {
        return {...e, processTask: task.option as unknown as EProcessChip}
      }

      return e;
    })
  }

  searchBarValue(e: string): void {
    this.tasksFilter = filterByElement<ITasks>('title', this.tasks, e);
    this.message = ERROR_MESSAGES.ELEMENT_FILTER_NOT_FOUND;
  }

  filterListByAction(e: IMauMenuOption): void {
    if (e.optionName == ECustomOptions.SHOW_ALL) {
      this.tasksFilter = this.tasks;
    }

    if (e.optionName == ECustomOptions.EXP_DATE) {
      this.tasksFilter = this.tasks.sort((a, b) => {
        const dateA = new Date(a.dateExpire);
        const dateB = new Date(b.dateExpire);
        
        return dateB.getTime() - dateA.getTime();
      });
    }
    
    if (e.optionName === EMenuOptionsState.DONE) {
      this.tasksFilter = filterByElement<ITasks>('processTask', this.tasks, e.optionName);
    }

    if (e.optionName === EMenuOptionsState.EXPIRED) {
      this.tasksFilter = filterByElement<ITasks>('processTask', this.tasks, e.optionName);
    }

    if (e.optionName === EMenuOptionsState.PENDING) {
      this.tasksFilter = filterByElement<ITasks>('processTask', this.tasks, e.optionName);
    }

    this.message = ERROR_MESSAGES.ELEMENT_FILTER_NOT_FOUND;
  }

  removeItemTasks(): void {
    this.tasks = [...this.tasks.filter((e) => !this.tasksToRemove().includes(e.id))];
    this.tasksFilter = [...this.tasks.filter((e) => !this.tasksToRemove().includes(e.id))];
    this.tasksToRemove.set([]);
    this.isShownIconTrash.set(false);
    this.optionSelected.set(null);
    this.isBackButtonShown.set(false);
  }
}