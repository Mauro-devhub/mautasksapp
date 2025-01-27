import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mau-checkbox',
  templateUrl: './mau-checkbox.component.html',
  styleUrls: ['./mau-checkbox.component.scss'],
  standalone: false
})
export class MauCheckboxComponent implements OnInit {
  value = input.required<number>();
  @Output() checkboxSelected = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  ionFocus(e: any): void {
    this.checkboxSelected.emit(e);
  }
}
