import { Component, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../model/task.model';

@Component({
  selector: 'page-details-task',
  templateUrl: './details-task.page.html',
  styleUrls: ['./details-task.page.scss'],
  standalone: false
})
export class DetailsTaskPage implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  taskService = inject(TaskService);
  route = inject(Router);

  tasks = computed(() => this.taskService.tasks());
  
  task!: TaskModel;

  taskId: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));

  constructor() { }

  ngOnInit(): void {
    this.setTaskDetails();
  }

  setTaskDetails(): void {
    const task = this.taskService.findTaskById(this.taskId);
    if (task) {
      this.task = task;
      return;
    }

    this.backPath();
  }

  backPath(): void {
    this.route.navigateByUrl('/');
  }

}
