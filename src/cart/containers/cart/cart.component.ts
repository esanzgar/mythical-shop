import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

import { StoreService } from '../../../store/store.service';
import {
  Cart,
  CartItem,
  CartService
} from '../../../shared/services/cart/cart.service';

@Component({
  selector: 'mshop-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  waiting = true;
  cart!: Cart;
  products$: Observable<CartItem[]> = this._store.select('cart').pipe(
    tap(cart => (this.cart = cart)),
    map(cart => Object.values(cart)),
    finalize(() => (this.waiting = false))
  );

  form = this.fb.group({
    search: null
  });

  private _subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private _cart: CartService,
    private _store: StoreService
  ) {}

  ngOnInit() {}

  onProductUpdate(product: CartItem, quantity: number) {
    this._cart.update(product, quantity);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  checkout() {
    window.alert('TO BE IMPLEMENTED: currently, it clears the cart');
    this._cart.clear();
  }
}
