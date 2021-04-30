import { Component, OnInit } from '@angular/core';
import {DeliveryAddress} from '../../models/delivery-address';
import {DeliveryAddressService} from '../../services/delivery-address.service';
import {NotificationService} from '../../services/notification.service';
import {NotificationTypes} from '../../enums/notification-types';

@Component({
  selector: 'app-delivery-info',
  templateUrl: './delivery-info.component.html',
  styleUrls: ['./delivery-info.component.scss']
})
export class DeliveryInfoComponent implements OnInit {

  deliveryAddress: DeliveryAddress;

  constructor(
    public deliveryAddressService: DeliveryAddressService,
    public notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getDeliveryAddress();
  }

  getDeliveryAddress(){
    if (this.deliveryAddressService.deliveryAddressExists()){
      this.deliveryAddress = this.deliveryAddressService.getDeliveryAddress();
    }else{
      this.deliveryAddress = null;
    }
  }

  public deleteDefaultAddress(){
    this.deliveryAddressService.removeAddress();
    this.notificationService.showSnackbar(NotificationTypes.INFO, 'Deleted', 'Default address deleted');
    this.getDeliveryAddress();
  }

}
