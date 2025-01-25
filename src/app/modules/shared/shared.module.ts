import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MauOverviewComponent } from './components/mau-overview/mau-overview.component';
import { MauHeaderComponent } from './components/mau-header/mau-header.component';
import { MauButtonComponent } from './components/mau-button/mau-button.component';
import { MauIconComponent } from './components/mau-icon/mau-icon.component';
import { MauMenuOptionsComponent } from './components/mau-menu-options/mau-menu-options.component';
import { MauBackdropComponent } from './components/mau-backdrop/mau-backdrop.component';
import { MauTaskItemComponent } from './components/mau-task-item/mau-task-item.component';
import { MauChipComponent } from './components/mau-chip/mau-chip.component';
import { MauTaskListComponent } from './components/mau-task-list/mau-task-list.component';
import { MauShowContentOrMessageComponent } from './components/mau-show-content-or-message/mau-show-content-or-message.component';
import { MauInfoMessageComponent } from './components/mau-info-message/mau-info-message.component';
import { MauCheckboxComponent } from './components/mau-checkbox/mau-checkbox.component';

@NgModule({
  declarations: [
    MauOverviewComponent,
    MauHeaderComponent,
    MauButtonComponent,
    MauIconComponent,
    MauMenuOptionsComponent,
    MauBackdropComponent,
    MauTaskItemComponent,
    MauChipComponent,
    MauTaskListComponent,
    MauShowContentOrMessageComponent,
    MauInfoMessageComponent,
    MauCheckboxComponent
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
    MauBackdropComponent,
    MauTaskItemComponent,
    MauChipComponent,
    MauTaskListComponent,
    MauShowContentOrMessageComponent,
    MauInfoMessageComponent,
    MauCheckboxComponent
  ]
})
export class SharedModule {}