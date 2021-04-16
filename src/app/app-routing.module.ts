import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {E404Component} from './shared/components/e404/e404.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'wines',
    pathMatch: 'full',
  },
  {
    path: 'wines',
    loadChildren: () => import('./wines/wines.module').then(m => m.WinesModule)
  },
  {
    path: '**',
    component: E404Component,
    data: {
      title: 'Not Found'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
