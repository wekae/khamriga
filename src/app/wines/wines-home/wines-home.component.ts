import {AfterViewInit, Component, OnInit} from '@angular/core';
import {NotificationService} from '../../shared/services/notification.service';
import {WinesService} from '../../shared/services/wines.service';
import {Wine} from '../../shared/models/wine';
import {environment} from '../../../environments/environment';
import {ShoppingCartService} from '../../shared/services/shopping-cart.service';
import {CartItem} from '../../shared/models/cart-item';
import {NotificationTypes} from '../../shared/enums/notification-types';
import {PackagingTypes} from '../../shared/enums/packaging-types';
// import { find, pull, filter, times, constant, debounce, set, get, keyBy, reduce, cloneDeep, sortedUniq } from 'lodash';
import * as _ from 'lodash';


@Component({
  selector: 'app-wines-home',
  templateUrl: './wines-home.component.html',
  styleUrls: ['./wines-home.component.scss']
})
export class WinesHomeComponent implements OnInit {

  wines: Wine[];
  allWines: Wine[];
  filteredWines: Wine[];
  imagesUrl = environment.imagesApiUrl;

  loading = true;
  loaded = false;
  error = false;

  cartItems: Wine[];
  totalCartItems = 0;
  totalCost = 0;

  sortDirection = 'descending';



  constructor(
    public notificationService: NotificationService,
    protected winesService: WinesService,
    public shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    // this.notificationService.showMessage('primary', 'test', 'this is a test');
    this.getAllWines();
  }

  getAllWines(){
    this.winesService.getAll().subscribe(response => {
      this.allWines = response;
      this.wines = this.allWines;
      this.cartItems = this.wines;
      this.loading = false;
      this.loaded = true;
    }, error1 => {
      this.loading = false;
      this.loaded = false;
      this.error = true;
    });

  }

  public getByTag(tag: string){
    this.wines =  this.allWines.filter(item => item.tags.some(tg => tg === tag));
  }

  public getAll(){
    this.wines =  this.allWines;
  }

  public sortByPrice(){
    if (this.sortDirection === 'ascending'){
      this. wines = _.orderBy(this.wines, ['cost.bottle'], ['asc']);
      this.sortDirection = 'descending';
    }else if (this.sortDirection === 'descending'){
      this. wines = _.orderBy(this.wines, ['cost.bottle'], ['desc']);
      this.sortDirection = 'ascending';
    }
  }



  getTotals(){
    this.totalCartItems = this.shoppingCartService.getItemsCount();
    this.totalCost = this.shoppingCartService.getTotal();
  }

  public addToCart(wine: Wine){
    const cartItem = new CartItem();
    cartItem.id = wine.no;
    cartItem.name = wine.name;
    cartItem.quantity = 112;
    cartItem.packaging = PackagingTypes.CASE;
    cartItem.unitPrice = wine.cost.bottle;
    cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
    cartItem.item = wine;
    this.shoppingCartService.addItem(cartItem);
    this.notificationService.showSnackbar(NotificationTypes.INFO, 'Added', cartItem.name +  ' added to cart');

    this.getTotals();
  }

  emptyCart(){
    this.shoppingCartService.emptyCart();
    this.notificationService.showSnackbar(NotificationTypes.INFO, 'Cleared', 'Cleared shopping cart');

    this.getTotals();
  }

}
