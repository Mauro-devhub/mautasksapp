import { Component, input, OnInit } from '@angular/core';

import { ITasks } from './interfaces/mau-tasks-list.interfaces';

@Component({
  selector: 'mau-task-list',
  templateUrl: './mau-task-list.component.html',
  styleUrls: ['./mau-task-list.component.scss'],
  standalone: false
})
export class MauTaskListComponent implements OnInit {
  tasks = input.required<ITasks[]>();

  constructor() { }

  ngOnInit() {}

}
