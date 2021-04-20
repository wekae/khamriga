import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WinesRoutingModule } from './wines-routing.module';
import { WinesHomeComponent } from './wines-home/wines-home.component';
import { WineDetailsComponent } from './wine-details/wine-details.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {ShoppingCartComponent} from '../shared/components/shopping-cart/shopping-cart.component';


@NgModule({
  declarations: [
    WinesHomeComponent,
    WineDetailsComponent,
  ],
  imports: [
    CommonModule,
    WinesRoutingModule,
    FormsModule,
    SharedModule,
    MDBBootstrapModule,
  ],
})
export class WinesModule { }
