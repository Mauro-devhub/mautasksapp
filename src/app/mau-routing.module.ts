import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'create-task',
    loadChildren: () => import('./modules/create-task/create-task.module').then( m => m.CreateTaskPageModule)
  },
  {
    path: 'details-task/:id',
    loadChildren: () => import('./modules/details-task/details-task.module').then( m => m.DetailsTaskPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class MauRoutingModule { }
