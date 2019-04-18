import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

import { StoreService } from '../../../store/store.service';
import { Cart, CartService } from '../../../shared/services/cart/cart.service';
import {
  Currency,
  CurrencyService
} from '../../../shared/services/currency/currency.service';
import {
  ProductsService,
  Product
} from '../../../shared/services/products/products.service';

@Component({
  selector: 'mshop-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  cart!: Cart;
  currency!: Currency;
  waiting = true;
  products$: Observable<Product[]> = this._products
    .list()
    .pipe(finalize(() => (this.waiting = false)));

  form = this.fb.group({
    search: null
  });

  private _subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private _store: StoreService,
    private _cart: CartService,
    private _products: ProductsService
  ) {}

  ngOnInit() {
    this._subscriptions = [
      this._store.select('cart').subscribe(cart => (this.cart = cart)),
      this._store
        .select('currency')
        .subscribe(currency => (this.currency = currency))
    ];
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  onProductUpdate(product: Product, quantity: number) {
    this._cart.update(product, quantity);
  }
}
