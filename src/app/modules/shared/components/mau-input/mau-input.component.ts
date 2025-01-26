import { Component, Input, input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'mau-input',
  templateUrl: './mau-input.component.html',
  styleUrls: ['./mau-input.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: MauInputComponent,
      multi: true
    }
  ]
})
export class MauInputComponent implements OnInit, ControlValueAccessor {
  @Input() value!: any;
  placeholder = input<string>();
  type = input<string>('text');
  readonly = input<boolean>(false);
  label = input<string>('');
  errorMessageInput = input<string>('');

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
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
