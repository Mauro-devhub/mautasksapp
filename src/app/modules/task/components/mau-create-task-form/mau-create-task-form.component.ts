import { Component, computed, effect, EventEmitter, inject, input, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ERROR_MESSAGES } from 'src/app/modules/shared/contants/error-messages.contant';
import { CreateTaskDTO } from '../../dtos/create-task.dto';
import { addDaysUtils, isBeforeUtils } from 'src/app/modules/shared/utils/date.utils';
import { EStateTask } from 'src/app/modules/shared/components/mau-chip/enums/mau-chip.enums';
import { TaskModel } from '../../model/task.model';
import { IMauMenuOption } from 'src/app/modules/shared/components/mau-menu-options/interfaces/mau-menu-options.interface';

@Component({
  selector: 'mau-create-task-form',
  templateUrl: './mau-create-task-form.component.html',
  styleUrls: ['./mau-create-task-form.component.scss'],
  standalone: false
})
export class MauCreateTaskFormComponent implements OnInit, OnDestroy {
  formBuilder = inject(FormBuilder);
  formGroupCreateTask!: FormGroup;

  task = input<TaskModel>();
  menuOptionsTask = input<IMauMenuOption[]>([]);

  stateTask = computed(() => this.task()?.stateTask as EStateTask);
  validation = signal<boolean>(false);

  errorMessageInputTitle = signal<string>('');
  errorMessageTextarea = signal<string>('');
  errorMessageDatetime = signal<string>('');

  isShownMenuOption = signal<boolean>(false);

  datetimeDefault = new Date(addDaysUtils(new Date(), 1)).toISOString();
  minDate: string = new Date(this.datetimeDefault).toISOString();

  subscription!: Subscription;

  @Output() saveForm = new EventEmitter<CreateTaskDTO>();

  constructor() { 
    effect(() => {
      this.task();

      this.validation.set( 
        this.stateTask() == EStateTask.EXPIRED ||
        this.stateTask() == EStateTask.DONE && isBeforeUtils(new Date(this.task()?.dateExpire as unknown as Date), new Date())
      );
    })
  }

  ngOnInit(): void {
    this.setForm(this.task());
  }

  setForm(task?: TaskModel): void {
    this.formGroupCreateTask = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      description: ['', Validators.required],
      dateExpire: ['', Validators.required],
      stateTask: [EStateTask.PENDING]
    })

    if (task) {
      this.formGroupCreateTask.patchValue(task);
    }

    this.formGroupCreateTask.controls['dateExpire'].setValue(this.datetimeDefault);

    this.subscription = this.formGroupCreateTask.valueChanges.subscribe(() => {
      this.validationsForm();
    })
  }

  validationsForm(): void {
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

  toggleMenu(): void {
    if (this.stateTask() !== EStateTask.EXPIRED) {
      this.isShownMenuOption.set(!this.isShownMenuOption());
    }
  }

  optionMenuSelected(e: IMauMenuOption): void {
    this.stateTask = computed(() => e.optionName as EStateTask);
    this.formGroupCreateTask.controls['stateTask'].setValue(this.stateTask());
    this.isShownMenuOption.set(false);
  }

  backdropClicked(e: any): void {
    this.isShownMenuOption.set(false);
  }

  save(): void {
    this.saveForm.emit(this.formGroupCreateTask.value);
    this.formGroupCreateTask.reset();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}