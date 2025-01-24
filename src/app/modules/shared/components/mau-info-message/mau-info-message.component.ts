import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'mau-info-message',
  templateUrl: './mau-info-message.component.html',
  styleUrls: ['./mau-info-message.component.scss'],
  standalone: false
})
export class MauInfoMessageComponent implements OnInit {
  message = input.required<string>();

  constructor() { }

  ngOnInit() {}

}
