import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsTaskPage } from './details-task.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsTaskPageRoutingModule {}
