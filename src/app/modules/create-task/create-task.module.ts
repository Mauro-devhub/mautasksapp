import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CreateTaskPageRoutingModule } from './create-task-routing.module';
import { CreateTaskPage } from './create-task.page';
import { SharedModule } from '../shared/shared.module';
import { CreateTasksComponentsModule } from './components/create-task-components.module';

@NgModule({
  imports: [
    IonicModule,
    CreateTaskPageRoutingModule,
    SharedModule,
    CreateTasksComponentsModule
  ],
  declarations: [CreateTaskPage]
})
export class CreateTaskPageModule {}
