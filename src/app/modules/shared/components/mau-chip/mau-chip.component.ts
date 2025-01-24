import { Component, effect, input, OnInit, signal } from '@angular/core';

import { TProcessChip } from './types/mau-chip.types';
import { EMauChip } from './enums/mau-chip.enums';

@Component({
  selector: 'mau-chip',
  templateUrl: './mau-chip.component.html',
  styleUrls: ['./mau-chip.component.scss'],
  standalone: false
})
export class MauChipComponent implements OnInit {
  currentProcess = input.required<TProcessChip>();
  
  color = signal<EMauChip>(EMauChip.PENDING);

  constructor() {
    effect(() => {
      this.color.set(this.setColor(this.currentProcess()));
    })
  }

  ngOnInit() {}

  setColor(type: TProcessChip): EMauChip {
    if (type == 'done') {
      return EMauChip.SUCCESS;
    }

    if (type == 'expired') {
      return EMauChip.DANGER;
    }

    return EMauChip.PENDING;
  }
}
