import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';

import { StoreService } from '../../../store/store.service';
import {
  Cart,
  CartItem,
  CartService
} from '../../../shared/services/cart/cart.service';
import { Currency } from '../../../shared/services/currency/currency.service';

@Component({
  selector: 'mshop-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cart!: Cart;
  currency!: Currency;
  products!: CartItem[];

  form = this.fb.group({
    search: null
  });

  private _subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private _store: StoreService,
    private _cart: CartService
  ) {}

  ngOnInit() {
    this._subscriptions = [
      this._store
        .select('cart')
        .pipe(
          tap(cart => (this.cart = cart)),
          tap(cart => (this.products = Object.values(cart)))
        )
        .subscribe(),
      this._store
        .select('currency')
        .subscribe(currency => (this.currency = currency))
    ];
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  onProductUpdate(product: CartItem, quantity: number) {
    this._cart.update(product, quantity);
  }

  checkout() {
    window.alert('TO BE IMPLEMENTED: currently, it clears the cart');
    this._cart.clear();
  }

  trackByFn(index: number, item: CartItem) {
    return item.id;
  }
}
