import { Component, input, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mau-textarea',
  templateUrl: './mau-textarea.component.html',
  styleUrls: ['./mau-textarea.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MauTextareaComponent,
      multi: true
    }
  ]
})
export class MauTextareaComponent implements OnInit, ControlValueAccessor {
  @Input() value!: any;
  placeholder = input<string>('');
  label = input<string>('');
  errorMessageTextarea = input<string>('');

  disabled: boolean = false;

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
    this.registerOnTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
