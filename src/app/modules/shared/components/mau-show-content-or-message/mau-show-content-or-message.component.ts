import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'mau-show-content-or-message',
  templateUrl: './mau-show-content-or-message.component.html',
  styleUrls: ['./mau-show-content-or-message.component.scss'],
  standalone: false
})
export class MauShowContentOrMessageComponent implements OnInit {
  hasContent = input.required<boolean>();
  message = input.required<string>();

  constructor() { }

  ngOnInit() {}

}
