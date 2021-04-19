import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WinesRoutingModule } from './wines-routing.module';
import { WinesHomeComponent } from './wines-home/wines-home.component';
import { WineDetailsComponent } from './wine-details/wine-details.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    WinesHomeComponent,
    WineDetailsComponent
  ],
    imports: [
        CommonModule,
        WinesRoutingModule,
        MDBBootstrapModule,
        FormsModule,
    ],
})
export class WinesModule { }
