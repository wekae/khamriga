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
import {ActivatedRoute, Router} from '@angular/router';


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
    private route: ActivatedRoute,
    private router: Router,
    public notificationService: NotificationService,
    protected winesService: WinesService,
    public shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    const currentUrl = this.route.routeConfig.path;


    // Load items based on URL
    switch (currentUrl){
      case 'tags/:tag':
        this.route.params.subscribe(routeParams => {
          const tag = routeParams.tag;
          console.log(tag);
          this.getAllWines(tag);
        });
        break;
      default:
        this.getAllWines();
        break;
    }
  }

  getAllWines(tag = ''){
    this.winesService.getAll().subscribe(response => {
      this.allWines = response;
      this.wines = this.allWines;
      if (tag !== ''){
        this.filterByTag(tag);
      }
      // this.cartItems = this.wines;
      this.loading = false;
      this.loaded = true;
    }, error1 => {
      this.loading = false;
      this.loaded = false;
      this.error = true;
    });

  }

  public filterByTag(tag: string){
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
    const name = wine.name;
    if (wine.quantityBottle > 0){
      const cartItem = new CartItem();
      cartItem.id = wine.no;
      cartItem.name = wine.name;
      cartItem.quantity = wine.quantityBottle;
      cartItem.packaging = PackagingTypes.BOTTLE;
      cartItem.unitPrice = wine.cost.bottle;
      cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
      cartItem.item = wine;
      this.shoppingCartService.addItem(cartItem);
      this.notificationService.showSnackbar(NotificationTypes.INFO, 'Added', name +  ' added to cart');
    }
    if (wine.quantityCase > 0){
      const cartItem = new CartItem();
      cartItem.id = wine.no;
      cartItem.name = wine.name;
      cartItem.quantity = wine.quantityCase;
      cartItem.packaging = PackagingTypes.CASE;
      cartItem.unitPrice = wine.cost.case;
      cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
      cartItem.item = wine;
      this.shoppingCartService.addItem(cartItem);
      this.notificationService.showSnackbar(NotificationTypes.INFO, 'Added', name +  ' added to cart');
    }

    this.getTotals();
  }

  emptyCart(){
    this.shoppingCartService.emptyCart();
    this.notificationService.showSnackbar(NotificationTypes.INFO, 'Cleared', 'Cleared shopping cart');

    this.getTotals();
  }

}
