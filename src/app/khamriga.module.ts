import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from './shared/shared.module';
import {WinesModule} from './wines/wines.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    SharedModule,
  ]
})
export class KhamrigaModule { }
