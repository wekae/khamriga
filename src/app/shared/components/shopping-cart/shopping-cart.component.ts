import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {CartItem} from '../../models/cart-item';
import {environment} from '../../../../environments/environment';
import {NotificationTypes} from '../../enums/notification-types';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})

export class ShoppingCartComponent implements OnInit{
  @Output() itemRemovedEvent = new EventEmitter<string>();
  @Output() cartLoadedEvent = new EventEmitter<string>();
  @Output() cartClearedEvent = new EventEmitter<string>();



  cartItems: CartItem[];
  imagesUrl = environment.imagesApiUrl;
  totalCost: number;
  totalItems: number;

  constructor(
    public notificationService: NotificationService,
    public shoppingCartService: ShoppingCartService,
  ) { }

  ngOnInit(): void {
    this.loadShoppingCart();
  }

  loadShoppingCart(){
    this.cartItems = this.shoppingCartService.getItems();
    this.totalCost = this.shoppingCartService.getTotal();
    this.totalItems = this.shoppingCartService.getItemsCount();
    this.cartLoadedEvent.emit();
  }

  removeCartItem(cartItem: CartItem){
    this.shoppingCartService.removeItem(cartItem);

    this.notificationService.showSnackbar(NotificationTypes.INFO, 'Removed', cartItem.name +  ' removed from cart');
    this.loadShoppingCart();
    this.itemRemovedEvent.emit();
  }

  emptyCart(){
    this.shoppingCartService.emptyCart();
    this.loadShoppingCart();
    this.notificationService.showSnackbar(NotificationTypes.INFO, 'Cleared', 'Cleared shopping cart');
    this.cartClearedEvent.emit();
  }

}
