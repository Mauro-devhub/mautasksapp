import { Component, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mau-datetime',
  templateUrl: './mau-datetime.component.html',
  styleUrls: ['./mau-datetime.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MauDatetimeComponent,
      multi: true
    }
  ]
})
export class MauDatetimeComponent implements OnInit, ControlValueAccessor {
  @Input() value: any = '';
  @Input() label: string = '';
  @Input() errorMessageDatetime: string = '';
  @Input() min: string = '';
  @Input() readonly: boolean = false;

  onChange = (_:any) => { };
  onTouch = () => { };

  constructor() { }

  ngOnInit() {}

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

}
