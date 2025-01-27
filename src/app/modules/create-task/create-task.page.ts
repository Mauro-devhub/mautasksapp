import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';

import { CreateTaskDTO } from './dtos/create-task.dto';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'page-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
  standalone: false
})
export class CreateTaskPage implements OnInit {
  route = inject(Router);
  taskService = inject(TaskService);

  isBackButtonShown = signal<boolean>(true);

  constructor() { }

  ngOnInit() {
  }

  previousPath() {
    this.route.navigate(['/']);
  }

  createTask(createTaskDto: CreateTaskDTO) {
    this.taskService.addTask(createTaskDto);
    this.previousPath();
  }

}
