import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { StoreService } from '../../../store/store.service';
import { Cart, CartService } from '../../../shared/services/cart/cart.service';

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
  waiting = true;
  products$!: Observable<Product[]>;

  form = this.fb.group({
    search: null
  });

  private _subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private _products: ProductsService,
    private _cart: CartService,
    private _store: StoreService
  ) {}

  ngOnInit() {
    this.products$ = this._products
      .list()
      .pipe(finalize(() => (this.waiting = false)));

    this._subscriptions = [
      this._store.select('cart').subscribe(cart => (this.cart = cart))
    ];
  }

  onProductUpdate(product: Product, quantity: number) {
    this._cart.update(product, quantity);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }
}
