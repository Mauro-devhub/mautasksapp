import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UpdateTaskDTO } from '../../dtos/update-task.dto';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../model/task.model';
import { MENU_OPTIONS_STATE } from 'src/app/modules/shared/contants/menu-options.constants';
import { EMenuOptionsState } from 'src/app/modules/shared/components/mau-menu-options/enums/mau.menu-options.enums';

@Component({
  selector: 'page-edit-task',
  templateUrl: './edit-task.page.html',
  styleUrls: ['./edit-task.page.scss'],
  standalone: false
})
export class EditTaskPage implements OnInit {
  route = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  taskService = inject(TaskService);

  titleHeader: string = 'Edit task';
  taskId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  task = signal<TaskModel>(new TaskModel());

  menuOptionsTask = MENU_OPTIONS_STATE.filter((e) => e.optionName !== EMenuOptionsState.EXPIRED);

  constructor() { }

  ngOnInit(): void {
    this.findTask();
  }

  ionViewWillEnter(): void {
    this.findTask();
  }

  findTask(): void {
    const task = this.taskService.findTaskById(this.taskId);
    if (task) {
      this.task.set(task);
      return;
    }

    this.backPath();
  }

  backPath(): void {
    this.route.navigateByUrl('/');
  }

  updateTask(updateTaskDto: UpdateTaskDTO): void {
    this.taskService.updateTask(this.taskId, updateTaskDto);
    this.backPath();
  }

}
