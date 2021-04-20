import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {E404Component} from './shared/components/e404/e404.component';
import {ShoppingCartComponent} from './shared/components/shopping-cart/shopping-cart.component';


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
  // {
  //   path: 'cart',
  //   component: ShoppingCartComponent,
  //   data: {
  //     title: 'Shopping Cart'
  //   }
  // },
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
