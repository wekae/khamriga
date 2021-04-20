import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { E404Component } from './components/e404/e404.component';
import { NotificationComponent } from './components/notification/notification.component';
import {RouterModule} from '@angular/router';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {ButtonsModule, MDBBootstrapModule, ModalModule, WavesModule} from 'angular-bootstrap-md';


@NgModule({
    declarations: [
      E404Component,
      NotificationComponent,
      ShoppingCartComponent
    ],
  exports: [
    NotificationComponent,
    E404Component,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ModalModule,
    MDBBootstrapModule,
  ]
})
export class SharedModule { }
