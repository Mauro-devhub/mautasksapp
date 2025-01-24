import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { DetailsTaskPageRoutingModule } from './details-task-routing.module';
import { DetailsTaskPage } from './details-task.page';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    DetailsTaskPageRoutingModule,
    SharedModule
  ],
  declarations: [DetailsTaskPage]
})
export class DetailsTaskPageModule {}
