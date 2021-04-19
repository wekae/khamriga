import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../shared/services/notification.service';
import {NotificationMessage} from '../../shared/components/notification/notification-message';
import {WinesService} from '../../shared/services/wines.service';
import {Wine} from '../../shared/models/wine';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-wines-home',
  templateUrl: './wines-home.component.html',
  styleUrls: ['./wines-home.component.scss']
})
export class WinesHomeComponent implements OnInit {

  wines: Wine[];
  imagesUrl = environment.imagesApiUrl;
  loading = true;
  error = false;

  cartItems: Wine[];



  constructor(
    public notificationService: NotificationService,
    protected winesService: WinesService
  ) { }

  ngOnInit(): void {
    // this.notificationService.showMessage('primary', 'test', 'this is a test');
    this.getAllWines();
  }

  getAllWines(){
    this.winesService.getAll().subscribe(response => {
      this.wines = response;
      this.cartItems = this.wines;
    }, error1 => {
      this.error = true;
    });

  }

}
