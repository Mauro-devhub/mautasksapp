import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CreateTaskPageRoutingModule } from './create-task-routing.module';
import { CreateTaskPage } from './create-task.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CreateTaskPageRoutingModule,
    SharedModule
  ],
  declarations: [CreateTaskPage]
})
export class CreateTaskPageModule {}
