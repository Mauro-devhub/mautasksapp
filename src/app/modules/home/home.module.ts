import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    RouterModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
