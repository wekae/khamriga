import { Injectable } from '@angular/core';
import {DeliveryAddress} from '../models/delivery-address';
import {environment} from '../../../environments/environment';
import {CartItem} from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAddressService {

  deliveryAddress: DeliveryAddress;

  constructor() { }

  public deliveryAddressExists(): boolean {
    return localStorage.getItem(environment.deliveryAddressKey) !== null;
  }

  public getDeliveryAddress(): DeliveryAddress {
    if (!this.deliveryAddressExists()){
      return null;
    }

    const retrieved = atob(localStorage.getItem(environment.deliveryAddressKey));
    const returnDeliveryAddress = JSON.parse(retrieved);
    const deliveryAddress = new DeliveryAddress();
    Object.assign(deliveryAddress, returnDeliveryAddress);
    return deliveryAddress;
  }

  public addAddress(address: DeliveryAddress): void{
    localStorage.setItem(environment.deliveryAddressKey, btoa(JSON.stringify(address)));
  }

  public removeAddress(): void{
    localStorage.removeItem(environment.deliveryAddressKey);
  }
}
