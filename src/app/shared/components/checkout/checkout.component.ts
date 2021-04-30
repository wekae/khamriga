import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {CartItem} from '../../models/cart-item';
import {environment} from '../../../../environments/environment';
import {NotificationService} from '../../services/notification.service';
import {DeliveryAddressService} from '../../services/delivery-address.service';
import {NotificationTypes} from '../../enums/notification-types';
import {Card} from '../../models/card';
import {DeliveryAddress} from '../../models/delivery-address';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isLinear = true;
  imagesApiUrl = environment.imagesApiUrl;
  cartItems: CartItem[];
  totalItems: number;
  totalCost: number;
  defaultAddress = false;
  checkoutComplete = false;
  paymentMethod: string;

  card: Card;
  deliveryAddress: DeliveryAddress;


  shoppingCartFormGroup: FormGroup;
  deliveryInfoFormGroup: FormGroup;
  paymentMethodFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public shoppingCartService: ShoppingCartService,
    public notificationService: NotificationService,
    public deliveryAddressService: DeliveryAddressService
  ) { }

  ngOnInit() {
    this.initForms();
    this.getShoppingCartItems();
    this.getTotals();
  }

  getShoppingCartItems(){
    this. cartItems = this.shoppingCartService.getItems();
  }

  getTotals(){
    this.totalCost = this.shoppingCartService.getTotal();
    this.totalItems = this.shoppingCartService.getItemsCount();
  }

  initForms(){
    this.shoppingCartFormGroup = this.formBuilder.group({
    });
    this.deliveryInfoFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      estate: ['', Validators.required],
      area: [''],
      deliveryNotes: [''],
    });
    this.paymentMethodFormGroup = this.formBuilder.group({
      paymentMethod: ['', Validators.required],
      cardNumber: [''],
      cardHolderName: [''],
      cardYear: [''],
      cardMonth: [''],
      cardCvv2: ['']
    });

    const paymentMethodControl = this.paymentMethodFormGroup.get('paymentMethod');
    const cardNumber = this.paymentMethodFormGroup.get('cardNumber');
    const cardHolderName = this.paymentMethodFormGroup.get('cardHolderName');
    const cardYear = this.paymentMethodFormGroup.get('cardYear');
    const cardMonth = this.paymentMethodFormGroup.get('cardMonth');
    const cardCvv2 = this.paymentMethodFormGroup.get('cardCvv2');

    paymentMethodControl.valueChanges.subscribe(value => {
      if (value === 'card'){
        cardNumber.setValidators([Validators.required]);
        cardHolderName.setValidators([Validators.required]);
        cardYear.setValidators([Validators.required]);
        cardMonth.setValidators([Validators.required]);
        cardCvv2.setValidators([Validators.required]);
      }else if (value === 'cash_on_delivery'){
        cardNumber.setValidators(null);
        cardHolderName.setValidators(null);
        cardYear.setValidators(null);
        cardMonth.setValidators(null);
        cardCvv2.setValidators(null);
      }


      cardNumber.updateValueAndValidity();
      cardHolderName.updateValueAndValidity();
      cardYear.updateValueAndValidity();
      cardMonth.updateValueAndValidity();
      cardCvv2.updateValueAndValidity();
    });
  }

  public removeCartItem(cartItem: CartItem){
    this.shoppingCartService.removeItem(cartItem);
    this.getShoppingCartItems();
    this.getTotals();
    this.notificationService.showSnackbar(NotificationTypes.INFO, 'Removed', cartItem.name +  ' removed from cart');

  }

  public updateCartItem(cartItem: CartItem){
    this.shoppingCartService.addItem(cartItem);
    this.getShoppingCartItems();
    this.getTotals();
    this.notificationService.showSnackbar(NotificationTypes.INFO, 'Updated', cartItem.name +  ' quantity updated');
  }

  public loadSavedDeliveryAddress(){
    if (this.deliveryAddressService.deliveryAddressExists()){
      this.deliveryAddress = this.deliveryAddressService.getDeliveryAddress();
      this.deliveryInfoFormGroup.get('firstName').setValue(this.deliveryAddress.firstName);
      this.deliveryInfoFormGroup.get('lastName').setValue(this.deliveryAddress.lastName);
      this.deliveryInfoFormGroup.get('email').setValue(this.deliveryAddress.email);
      this.deliveryInfoFormGroup.get('mobileNumber').setValue(this.deliveryAddress.mobileNumber);
      this.deliveryInfoFormGroup.get('deliveryAddress').setValue(this.deliveryAddress.deliveryAddress);
      this.deliveryInfoFormGroup.get('estate').setValue(this.deliveryAddress.estate);
      this.deliveryInfoFormGroup.get('area').setValue(this.deliveryAddress.area);
      this.deliveryInfoFormGroup.get('deliveryNotes').setValue(this.deliveryAddress.deliveryNotes);
    }else{
      this.notificationService.showSnackbar(NotificationTypes.WARNING, 'Not Found', 'No default delivery address available');
    }

  }

  public loadSummary(){
    this.paymentMethod = this.paymentMethodFormGroup.get('paymentMethod')?.value;
    this.card = new Card();
    this.card.cardHolderName = this.paymentMethodFormGroup.get('cardHolderName')?.value;
    this.card.cardNumber = this.paymentMethodFormGroup.get('cardNumber')?.value;
    this.card.year = this.paymentMethodFormGroup.get('cardYear')?.value;
    this.card.month = this.paymentMethodFormGroup.get('cardMonth')?.value;
    this.card.cvv2 = this.paymentMethodFormGroup.get('cardCvv2')?.value;


    this.deliveryAddress = new DeliveryAddress();
    this.deliveryAddress.firstName = this.deliveryInfoFormGroup.get('firstName')?.value;
    this.deliveryAddress.lastName = this.deliveryInfoFormGroup.get('lastName')?.value;
    this.deliveryAddress.email = this.deliveryInfoFormGroup.get('email')?.value;
    this.deliveryAddress.mobileNumber = this.deliveryInfoFormGroup.get('mobileNumber')?.value;
    this.deliveryAddress.deliveryAddress = this.deliveryInfoFormGroup.get('deliveryAddress')?.value;
    this.deliveryAddress.estate = this.deliveryInfoFormGroup.get('estate')?.value;
    this.deliveryAddress.area = this.deliveryInfoFormGroup.get('area')?.value;
    this.deliveryAddress.deliveryNotes = this.deliveryInfoFormGroup.get('deliveryNotes')?.value;
  }

  public checkout(){
    if (this.defaultAddress === true && this.deliveryAddress !== null){
      this.deliveryAddressService.addAddress(this.deliveryAddress);
    }

    // TODO: implement checkout logic with external api

    this.checkoutComplete = true;
    this.shoppingCartService.emptyCart();
  }

}
