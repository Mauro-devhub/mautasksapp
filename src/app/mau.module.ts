import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { MauComponent } from './mau.component';
import { MauRoutingModule } from './mau-routing.module';

@NgModule({
  declarations: [MauComponent],
  imports: [BrowserModule, IonicModule.forRoot(), MauRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [MauComponent],
})
export class MauModule {}
