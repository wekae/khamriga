import { Component, OnInit } from '@angular/core';
import {Wine} from '../../shared/models/wine';
import {environment} from '../../../environments/environment';
import {NotificationService} from '../../shared/services/notification.service';
import {WinesService} from '../../shared/services/wines.service';
import {ShoppingCartService} from '../../shared/services/shopping-cart.service';
import {ActivatedRoute, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {CartItem} from '../../shared/models/cart-item';
import {PackagingTypes} from '../../shared/enums/packaging-types';
import {NotificationTypes} from '../../shared/enums/notification-types';

@Component({
  selector: 'app-wine-details',
  templateUrl: './wine-details.component.html',
  styleUrls: ['./wine-details.component.scss']
})
export class WineDetailsComponent implements OnInit {

  wines: Wine[];
  item: Wine;
  imagesUrl = environment.imagesApiUrl;

  loading = true;
  loaded = false;
  error = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public notificationService: NotificationService,
    protected winesService: WinesService,
    public shoppingCartService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    this.getItem();
  }

  private getItem() {
    this.route.params.subscribe(routeParams => {
      const wineNo = routeParams.id;
      this.getWine(wineNo);
    });
  }



  getWine(wineNo: string){
    this.winesService.getAll().subscribe(response => {
      this.wines = response;
      this.getById(wineNo);
    }, error1 => {
      this.loading = false;
      this.loaded = false;
      this.error = true;
    });
  }

  public getById(wineNo: string){
    const filtered =  this.wines.filter(item => item.no === wineNo);
    if (filtered !== null){
      this.item = filtered[0];
      this.loaded = true;
      this.loading = false;
      this.error = false;
    }else{
      this.loaded = false;
      this.loading = false;
      this.error = true;
    }
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

    // this.getTotals();
  }

}
