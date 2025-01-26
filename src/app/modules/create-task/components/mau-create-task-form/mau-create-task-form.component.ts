import { Component, EventEmitter, inject, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ERROR_MESSAGES } from 'src/app/modules/shared/contants/error-messages.contant';
import { CreateTaskDTO } from '../../dtos/create-task.dto';
import { isBeforeUtils } from 'src/app/modules/shared/utils/date.utils';

@Component({
  selector: 'mau-create-task-form',
  templateUrl: './mau-create-task-form.component.html',
  styleUrls: ['./mau-create-task-form.component.scss'],
  standalone: false
})
export class MauCreateTaskFormComponent implements OnInit, OnDestroy {
  formBuilder = inject(FormBuilder);
  formGroupCreateTask!: FormGroup;

  errorMessageInputTitle = signal<string>('');
  errorMessageTextarea = signal<string>('');
  errorMessageDatetime = signal<string>('');

  subscription!: Subscription;

  @Output() saveForm = new EventEmitter<CreateTaskDTO>();

  constructor() { }

  ngOnInit() {
    this.setForm();
  }

  setForm() {
    this.formGroupCreateTask = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', Validators.required],
      dateExpire: ['', Validators.required]
    })

    this.subscription = this.formGroupCreateTask.valueChanges.subscribe(() => {
      this.validationsForm();
    })
  }

  validationsForm() {
    this.errorMessageInputTitle.set('');
    this.errorMessageTextarea.set('');
    this.errorMessageDatetime.set('');

    // validation title
    if (this.formGroupCreateTask.controls['title'].hasError('required') && this.formGroupCreateTask.controls['title'].dirty) {
      this.errorMessageInputTitle.set(ERROR_MESSAGES.DEFAULT_ERROR);
    }

    if (
      (
        this.formGroupCreateTask.controls['title'].hasError('minlength') ||
        String(this.formGroupCreateTask.controls['title'].value).split('').filter((a: string) => a !== ' ').length < 5
      )
      && !this.formGroupCreateTask.controls['title'].hasError('required')
    ) {
      this.errorMessageInputTitle.set(ERROR_MESSAGES.MIN_CHARACTERS);
    }

    // validation description
    if (this.formGroupCreateTask.controls['description'].hasError('required') && this.formGroupCreateTask.controls['description'].dirty) {
      this.errorMessageTextarea.set(ERROR_MESSAGES.DEFAULT_ERROR);
    }

    // validation dateExpire
    if (this.formGroupCreateTask.controls['dateExpire'].hasError('required') && this.formGroupCreateTask.controls['dateExpire'].dirty) {
      this.errorMessageDatetime.set(ERROR_MESSAGES.DEFAULT_ERROR);
    }

    if (isBeforeUtils(new Date(this.formGroupCreateTask.controls['dateExpire'].value), new Date()) && this.formGroupCreateTask.controls['dateExpire'].dirty) {
      this.errorMessageDatetime.set(ERROR_MESSAGES.INVALID_DATE);
    }
  }

  save(): void {
    this.saveForm.emit(this.formGroupCreateTask.value);
    this.formGroupCreateTask.reset();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}