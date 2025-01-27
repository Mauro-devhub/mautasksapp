import { Component, effect, input, OnInit, signal } from '@angular/core';

import { EMauChip, EStateTask } from './enums/mau-chip.enums';

@Component({
  selector: 'mau-chip',
  templateUrl: './mau-chip.component.html',
  styleUrls: ['./mau-chip.component.scss'],
  standalone: false
})
export class MauChipComponent implements OnInit {
  currentState = input.required<string>();
  label = input<string>('');
  
  color = signal<EMauChip>(EMauChip.PENDING);

  constructor() {
    effect(() => {
      this.color.set(this.setColor(this.currentState() as EStateTask));
    })
  }

  ngOnInit() {}

  setColor(type: EStateTask): EMauChip {
    if (type == EStateTask.DONE) {
      return EMauChip.SUCCESS;
    }

    if (type == EStateTask.EXPIRED) {
      return EMauChip.DANGER;
    }

    return EMauChip.PENDING;
  }
}
