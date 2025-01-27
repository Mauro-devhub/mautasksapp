import { effect, Injectable, signal } from '@angular/core';

import { TaskModel } from '../model/task.model';
import { CreateTaskDTO } from '../create-task/dtos/create-task.dto';
import { formatUtils } from '../shared/utils/date.utils';
import { EStateTask } from '../shared/components/mau-chip/enums/mau-chip.enums';

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
      title: 'jose',
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