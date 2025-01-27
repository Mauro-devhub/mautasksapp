import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { EStateTask } from 'src/app/modules/shared/components/mau-chip/enums/mau-chip.enums';
import { EMenuOptionsDefault, ECustomOptions } from 'src/app/modules/shared/components/mau-menu-options/enums/mau.menu-options.enums';
import { IMauMenuOption } from 'src/app/modules/shared/components/mau-menu-options/interfaces/mau-menu-options.interface';
import { TMenu } from 'src/app/modules/shared/components/mau-menu-options/types/mau-menu.types';
import { ERROR_MESSAGES } from 'src/app/modules/shared/contants/error-messages.contant';
import { MENU_OPTIONS, MENU_OPTIONS_TASK, MENU_OPTIONS_SEARCH_BAR } from 'src/app/modules/shared/contants/menu-options.constants';
import { NAVIGATE_URL } from 'src/app/modules/shared/enums/navigate-url.enum';
import { filterByElement } from 'src/app/modules/shared/utils/filters.utils';
import { TaskModel } from '../task/model/task.model';
import { TaskService } from '../task/services/task.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  route = inject(Router);
  taskService = inject(TaskService);

  tasks = computed(() => this.taskService.tasks());

  isMenuOpen = signal<boolean>(false);
  isBackButtonShown = signal<boolean>(false);
  
  optionSelected = signal<EMenuOptionsDefault | null>(null);
  
  idsTasksToRemove = signal<number[]>([]);
  tasksToComplete = signal<number[]>([]);

  message = ERROR_MESSAGES.NOT_HAS_CONTENT;
  placeholderSearchBar: string = 'search a task by title'
  
  menuOptions: IMauMenuOption[] = MENU_OPTIONS;
  menuOptionsTask: IMauMenuOption[] = MENU_OPTIONS_TASK;
  menuOptionsSearchBar: IMauMenuOption[] = MENU_OPTIONS_SEARCH_BAR;
  menuUniqueOptionIsCreate: IMauMenuOption[] = MENU_OPTIONS.filter((e) => e.action === EMenuOptionsDefault.CREATE);

  constructor() { }

  backdropClicked(e: any): void {
    this.isMenuOpen.set(false);
  }

  menuOpened(e: boolean): void {
    this.optionSelected.set(null);
    this.isBackButtonShown.set(false);
    this.isMenuOpen.set(e);

    if (this.idsTasksToRemove().length > 0) {
      this.idsTasksToRemove.set([]);
    }
  }

  menuSearchBarOpened(e: boolean): void {
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

    if (!this.idsTasksToRemove().includes(e)) {
      const idTaskToRemove = [...this.idsTasksToRemove(), e];
      this.idsTasksToRemove.set(idTaskToRemove);
    } else {
      const idTaskExist = this.idsTasksToRemove().filter((prev) => prev !== e);
      this.idsTasksToRemove.set(idTaskExist);
    }

    if (this.idsTasksToRemove().length > 0) {
      this.isBackButtonShown.set(false);
    } else {
      this.isBackButtonShown.set(true);
    }
  }

  taskChangeState(task: {id: number, option: TMenu}): void {
    if (task.option === EMenuOptionsDefault.DELETE) {
      this.taskService.removeTask(task.id);
      return;
    }

    this.taskService.changueStateTask(task.id, task.option as unknown as EStateTask);
  }

  searchBarValue(e: string): void {
    this.tasks = computed(() => filterByElement<TaskModel>('title', this.taskService.tasks(), e));
    this.message = ERROR_MESSAGES.ELEMENT_FILTER_NOT_FOUND;
  }

  optionMenuSearchBarSelected(e: IMauMenuOption): void {
    if (e.optionName == ECustomOptions.SHOW_ALL) {
      this.tasks = computed(() => this.taskService.tasks());
      return;
    }

    if (e.optionName == ECustomOptions.EXP_DATE_ASC) {
      this.tasks = computed(() => this.taskService.tasks().sort((a, b) => {
        const dateA = new Date(a.dateExpire);
        const dateB = new Date(b.dateExpire);
        
        return dateA.getTime() - dateB.getTime();
      }));

      return;
    }

    if (e.optionName == ECustomOptions.EXP_DATE_DESC) {
      this.tasks = computed(() => this.taskService.tasks().sort((a, b) => {
        const dateA = new Date(a.dateExpire);
        const dateB = new Date(b.dateExpire);
        
        return dateB.getTime() - dateA.getTime();
      }));

      return;
    }
    
    this.tasks = computed(() => filterByElement<TaskModel>('stateTask', this.taskService.tasks(), e.optionName));
    this.message = ERROR_MESSAGES.ELEMENT_FILTER_NOT_FOUND;
  }

  removeItemTasks(): void {
    if (this.idsTasksToRemove().length > 0) {
      this.taskService.removeTasks(this.idsTasksToRemove());
      this.idsTasksToRemove.set([]);
    }

    if (this.tasks().length <= 0) {
      this.message = ERROR_MESSAGES.NOT_HAS_CONTENT;
    }

    this.isBackButtonShown.set(false);
    this.optionSelected.set(null);
  }
}