import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { EditTaskPageRoutingModule } from './edit-task-routing.module';
import { EditTaskPage } from './edit-task.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditTaskPageRoutingModule,
    SharedModule
  ],
  declarations: [EditTaskPage]
})
export class EditTaskPageModule {}
