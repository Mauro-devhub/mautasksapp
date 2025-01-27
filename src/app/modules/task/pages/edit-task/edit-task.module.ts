import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { EditTaskPageRoutingModule } from './edit-task-routing.module';
import { EditTaskPage } from './edit-task.page';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { CreateTasksComponentsModule } from '../../components/create-task-components.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    EditTaskPageRoutingModule,
    SharedModule,
    CreateTasksComponentsModule
  ],
  declarations: [EditTaskPage]
})
export class EditTaskPageModule {}
