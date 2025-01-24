import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'mau-backdrop',
  templateUrl: './mau-backdrop.component.html',
  styleUrls: ['./mau-backdrop.component.scss'],
  standalone: false
})
export class MauBackdropComponent implements OnInit {
  isBackdropVisible = input<boolean>(false);

  @Output() backdropClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {}
  
  isBackdropClicked(event: any) {
    this.backdropClicked.emit(event);
  }
}
