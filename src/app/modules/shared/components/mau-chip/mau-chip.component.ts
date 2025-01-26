import { Component, effect, input, OnInit, signal } from '@angular/core';

import { EMauChip, EProcessChip } from './enums/mau-chip.enums';

@Component({
  selector: 'mau-chip',
  templateUrl: './mau-chip.component.html',
  styleUrls: ['./mau-chip.component.scss'],
  standalone: false
})
export class MauChipComponent implements OnInit {
  currentProcess = input.required<string>();
  
  color = signal<EMauChip>(EMauChip.PENDING);

  constructor() {
    effect(() => {
      this.color.set(this.setColor(this.currentProcess() as EProcessChip));
    })
  }

  ngOnInit() {}

  setColor(type: EProcessChip): EMauChip {
    if (type == EProcessChip.DONE) {
      return EMauChip.SUCCESS;
    }

    if (type == EProcessChip.EXPIRED) {
      return EMauChip.DANGER;
    }

    return EMauChip.PENDING;
  }
}
