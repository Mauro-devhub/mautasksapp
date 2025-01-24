import { Component, input, OnInit } from '@angular/core';

import { TProcessChip } from '../mau-chip/types/mau-chip.types';

@Component({
  selector: 'mau-task-item',
  templateUrl: './mau-task-item.component.html',
  styleUrls: ['./mau-task-item.component.scss'],
  standalone: false
})
export class MauTaskItemComponent implements OnInit {
  title = input.required<string>();
  dateExpire = input.required<Date>();
  processTask = input.required<TProcessChip>();

  constructor() { }

  ngOnInit() {}

}
