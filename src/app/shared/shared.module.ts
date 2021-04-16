import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { E404Component } from './components/e404/e404.component';
import { NotificationComponent } from './components/notification/notification.component';



@NgModule({
    declarations: [
      E404Component,
      NotificationComponent],
    exports: [
        NotificationComponent,
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
