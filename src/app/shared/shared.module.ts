import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { E404Component } from './components/e404/e404.component';
import { NotificationComponent } from './components/notification/notification.component';
import {RouterModule} from '@angular/router';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {ButtonsModule, MDBBootstrapModule, ModalModule, WavesModule} from 'angular-bootstrap-md';
import { CheckoutComponent } from './components/checkout/checkout.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule} from '@angular/material/radio';
import { DeliveryInfoComponent } from './components/delivery-info/delivery-info.component';

@NgModule({
    declarations: [
      E404Component,
      NotificationComponent,
      ShoppingCartComponent,
      CheckoutComponent,
      DeliveryInfoComponent
    ],
  exports: [
    NotificationComponent,
    E404Component,
    ShoppingCartComponent,
    MatStepperModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    DeliveryInfoComponent,
  ],
    imports: [
        CommonModule,
        RouterModule,
        ModalModule,
        MDBBootstrapModule,
        MatStepperModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        FormsModule,
        MatRadioModule,
    ]
})
export class SharedModule { }
