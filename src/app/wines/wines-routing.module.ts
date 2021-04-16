import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WineDetailsComponent} from './wine-details/wine-details.component';
import {WinesHomeComponent} from './wines-home/wines-home.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'All Wines'
    },
    children: [
      {
        path: '',
        redirectTo: 'home'
      },
      {
        path: ':id/details',
        component: WineDetailsComponent,
        data: {
          title: 'Details'
        }
      },
      {
        path: 'home',
        component: WinesHomeComponent,
        data: {
          title: 'All Wines'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WinesRoutingModule { }
