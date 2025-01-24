import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MauOverviewComponent } from './components/mau-overview/mau-overview.component';
import { MauHeaderComponent } from './components/mau-header/mau-header.component';
import { MauButtonComponent } from './components/mau-button/mau-button.component';
import { MauIconComponent } from './components/mau-icon/mau-icon.component';
import { MauMenuOptionsComponent } from './components/mau-menu-options/mau-menu-options.component';
import { MauBackdropComponent } from './components/mau-backdrop/mau-backdrop.component';

@NgModule({
  declarations: [
    MauOverviewComponent,
    MauHeaderComponent,
    MauButtonComponent,
    MauIconComponent,
    MauMenuOptionsComponent,
    MauBackdropComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    MauOverviewComponent,
    MauHeaderComponent,
    MauButtonComponent,
    MauIconComponent,
    MauMenuOptionsComponent,
    MauBackdropComponent
  ]
})
export class SharedModule {}