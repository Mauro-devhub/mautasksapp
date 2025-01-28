import { computed, inject, Injectable, signal } from '@angular/core';

import { TaskModel } from '../model/task.model';
import { CreateTaskDTO } from '../dtos/create-task.dto';
import { formatUtils } from '../../shared/utils/date.utils';
import { EStateTask } from '../../shared/components/mau-chip/enums/mau-chip.enums';
import { UpdateTaskDTO } from '../dtos/update-task.dto';
import { LocalStorageService } from '../../shared/services/localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private localStorageService = inject(LocalStorageService);
  
  private tasksStorage = signal<TaskModel[]>([]);

  private keyTasks = 'tasks';
  
  tasks = computed<TaskModel[]>(() => this.tasksStorage());

  constructor() { 
    this.getAllTasks();
  }

  getAllTasks(): void {
    this.tasksStorage.set(this.localStorageService.getItem<TaskModel[]>(this.keyTasks) || []);
  }

  addTask(createTaskDto: CreateTaskDTO): void {
    this.getAllTasks();
    const tasks = this.tasks();

    let id: number = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 0;

    const newTask: TaskModel = {
      ...createTaskDto,
      id,
      dateExpire: formatUtils(new Date(createTaskDto.dateExpire))
    }

    if (tasks) {
      const tasksList = [...tasks, newTask];
      this.localStorageService.setItem(this.keyTasks, tasksList);
      this.getAllTasks();
      return;
    }

    this.localStorageService.setItem(this.keyTasks, [newTask]);
    this.getAllTasks();
  }

  updateTask(taskId: number, updateTaskDto: UpdateTaskDTO): void {
    this.getAllTasks();
    let tasksUpdated: TaskModel[] = [];
    const tasks = this.tasks();
    
    if (tasks) {
      tasksUpdated = tasks.map((e) => {
        if (e.id === taskId) {
          return {...e, ...updateTaskDto};
        }
  
        return e;
      })
    }

    this.localStorageService.setItem(this.keyTasks, tasksUpdated);
    this.getAllTasks();
  }

  findTaskById(taskId: number): TaskModel | null{
    this.getAllTasks();
    const tasks = this.tasks();
    
    if (tasks) {
      return tasks.find((e) => e.id == taskId) as TaskModel;
    }

    return null;
  }

  changueStateTask(taskId: number, state: EStateTask): void {
    this.getAllTasks();
    const tasks = this.tasks();
    
    if (tasks) {
      const taskIndex = tasks.findIndex((e) => e.id === taskId);
      
      if (taskIndex !== -1) {
        tasks[taskIndex].stateTask = state;
      }

      this.localStorageService.setItem(this.keyTasks, tasks);
    }
    this.getAllTasks();
  }

  removeTasks(taskIds: number[]): void {
    this.getAllTasks()
    const tasks = this.tasks();
    if (tasks) {
      const tasksUpdated = tasks.filter((e) => !taskIds.includes(e.id));
      this.localStorageService.setItem(this.keyTasks, tasksUpdated);
    }
    this.getAllTasks();
  }

  removeTask(id: number): void {
    this.getAllTasks()
    const tasks = this.tasks();
    if (tasks) {
      const tasksUpdated = tasks.filter((e) => e.id !== id);
      this.localStorageService.setItem(this.keyTasks, tasksUpdated);
    }
    this.getAllTasks();
  }
}