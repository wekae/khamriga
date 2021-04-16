import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WinesRoutingModule } from './wines-routing.module';
import { WinesHomeComponent } from './wines-home/wines-home.component';
import { WineDetailsComponent } from './wine-details/wine-details.component';


@NgModule({
  declarations: [WinesHomeComponent, WineDetailsComponent],
  imports: [
    CommonModule,
    WinesRoutingModule
  ]
})
export class WinesModule { }
