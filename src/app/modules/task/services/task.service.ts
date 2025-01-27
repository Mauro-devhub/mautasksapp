import { effect, Injectable, signal } from '@angular/core';

import { TaskModel } from '../model/task.model';
import { CreateTaskDTO } from '../dtos/create-task.dto';
import { formatUtils } from '../../shared/utils/date.utils';
import { EStateTask } from '../../shared/components/mau-chip/enums/mau-chip.enums';
import { UpdateTaskDTO } from '../dtos/update-task.dto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks = signal<TaskModel[]>([
    {
      id: 0,
      title: 'camil',
      description: 'jhkgbh',
      stateTask: EStateTask.DONE,
      dateExpire: '01/23/2025'
    },
    {
      id: 1,
      title: 'carlo',
      description: 'jhkgbh',
      stateTask: EStateTask.EXPIRED,
      dateExpire: '01/21/2025'
    },
    {
      id: 2,
      title: 'joses',
      description: 'jhkgbh',
      stateTask: EStateTask.PENDING,
      dateExpire: '01/28/2025'
    }
  ]);
  
  id: number = 2;
  
  constructor() { 
    effect(() => {
      console.log(this.tasks());
    })
  }

  addTask(createTaskDto: CreateTaskDTO) {
    this.id++;

    const newTask: TaskModel = {
      ...createTaskDto,
      id: this.id,
      dateExpire: formatUtils(new Date(createTaskDto.dateExpire))
    }

    const tasks = [...this.tasks(), newTask];

    this.tasks.set(tasks);
  }

  updateTask(taskId: number, updateTaskDto: UpdateTaskDTO) {
    const tasks = this.tasks().map((e) => {
      if (e.id === taskId) {
        return {...e, ...updateTaskDto};
      }

      return e;
    })

    this.tasks.set(tasks);
  }

  findTaskById(taskId: number): TaskModel {
    const task = this.tasks().find((e) => e.id === taskId);
    if (!!task) {
      return task;
    }

    return new TaskModel();
  }

  changueStateTask(taskId: number, state: EStateTask) {
    const tasks = this.tasks();
    
    const taskIndex = tasks.findIndex((e) => e.id === taskId);
  
    if (taskIndex !== -1) {
      tasks[taskIndex].stateTask = state;
    }

    this.tasks.set(tasks);
  }

  removeTasks(taskIds: number[]): void {
    const tasks = this.tasks().filter((e) => !taskIds.includes(e.id));
    this.tasks.set(tasks);
  }

  removeTask(id: number): void {
    const tasks = [...this.tasks().filter((e) => e.id !== id)];
    this.tasks.set(tasks);
  }
}