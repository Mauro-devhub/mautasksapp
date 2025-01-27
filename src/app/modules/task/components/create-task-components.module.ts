import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MauCreateTaskFormComponent } from './mau-create-task-form/mau-create-task-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    MauCreateTaskFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    MauCreateTaskFormComponent
  ]
})
export class CreateTasksComponentsModule {}