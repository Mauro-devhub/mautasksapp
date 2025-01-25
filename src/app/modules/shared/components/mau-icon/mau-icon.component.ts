import { Component, input, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { add, createOutline, ellipsisHorizontalOutline, trashOutline, fileTrayStackedOutline, arrowUndoOutline } from 'ionicons/icons';

@Component({
  selector: 'mau-icon',
  templateUrl: './mau-icon.component.html',
  styleUrls: ['./mau-icon.component.scss'],
  standalone: false
})
export class MauIconComponent implements OnInit {
  name = input.required<string>();
  size = input<'large' | 'small'>('small');

  constructor() { 
    addIcons({ 
      ellipsisHorizontalOutline,
      add,
      trashOutline,
      createOutline,
      fileTrayStackedOutline,
      arrowUndoOutline
    })
  }
  
  ngOnInit() {}

}
