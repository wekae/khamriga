import { Injectable } from '@angular/core';
import {ShoppingCart} from '../models/shopping-cart';
import {environment} from '../../../environments/environment';
import {CartItem} from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  shoppingCart: ShoppingCart;


  constructor() { }

  public shoppingCartExists(): boolean {
    return localStorage.getItem(environment.shoppingCartKey) !== null;
  }

  public initShoppingCart(): void {
    if (localStorage.getItem(environment.shoppingCartKey) === null){
      this.shoppingCart = new ShoppingCart();
      localStorage.setItem(environment.shoppingCartKey, btoa(JSON.stringify(this.shoppingCart)));
    }
  }

  private getShoppingCart(): ShoppingCart {
    if (!this.shoppingCartExists()){
      this.initShoppingCart();
    }

    const retrieved = atob(localStorage.getItem(environment.shoppingCartKey));
    const returnCart = JSON.parse(retrieved);
    const shoppingCart = new ShoppingCart();
    Object.assign(shoppingCart, returnCart);
    return shoppingCart;
  }

  public addItem(item: CartItem): void{
    this.shoppingCart = this.getShoppingCart();
    this.shoppingCart.addItem(item);
    localStorage.setItem(environment.shoppingCartKey, btoa(JSON.stringify(this.shoppingCart)));
  }

  public removeItem(item: CartItem): void{
    this.shoppingCart = this.getShoppingCart();
    this.shoppingCart.removeItem(item);
    localStorage.setItem(environment.shoppingCartKey, btoa(JSON.stringify(this.shoppingCart)));
  }

  public emptyCart(): void{
    this.shoppingCart = new ShoppingCart();
    localStorage.setItem(environment.shoppingCartKey, btoa(JSON.stringify(this.shoppingCart)));
  }

  public getItems(): CartItem[]{
    this.shoppingCart = this.getShoppingCart();
    return this.shoppingCart.getItems();
  }

  public getItemsCount(): number{
    this.shoppingCart = this.getShoppingCart();
    return this.shoppingCart.getItemsCount();
  }

  public getTotal(): number{
    this.shoppingCart = this.getShoppingCart();
    return this.shoppingCart.getTotal();
  }
}
