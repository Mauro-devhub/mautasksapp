import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mau-button',
  templateUrl: './mau-button.component.html',
  styleUrls: ['./mau-button.component.scss'],
  standalone: false
})
export class MauButtonComponent implements OnInit {
  type = input<string>('');
  disabled = input<boolean>(false);

  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  setClick() {
    this.onClick.emit();
  }

}
