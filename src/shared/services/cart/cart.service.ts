import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { StoreService } from '../../../store/store.service';
import { Product } from '../products/products.service';

export interface CartItem extends Product {
  quantity: number;
}

export type Cart = Record<string, CartItem>;

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy {
  // TODO: replace all reference of window object for an injection token (so it
  // works in other context like server side rendering, e.g. Angular Universal)

  private readonly keyname = 'mshop-cart';

  private _cart: Cart = {};
  private _subscription: Subscription;

  constructor(private _store: StoreService) {
    this._subscription = this._init().subscribe();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  update(product: Product, quantity: number) {
    if (quantity <= 0) {
      this._cart = { ...this._cart };
      delete this._cart[product.id];
    } else {
      const updatedProduct: CartItem = { ...product, quantity: quantity };
      this._cart = { ...this._cart, [product.id]: updatedProduct };
    }

    this._store.set('cart', this._cart);
    window.localStorage.setItem(this.keyname, JSON.stringify(this._cart));
  }

  clear() {
    this._setCartInStore(null);
    window.localStorage.setItem(this.keyname, JSON.stringify(this._cart));
  }

  private _init(): Observable<StorageEvent> {
    this._setCartInStore(window.localStorage.getItem(this.keyname));

    // This allows inter-window communication
    // The storage event is only triggered by a different window
    return fromEvent<StorageEvent>(window, 'storage').pipe(
      filter(event => event.key === this.keyname),
      tap(event => this._setCartInStore(event.newValue))
    );
  }

  private _setCartInStore(value: string | null) {
    this._cart = JSON.parse(value || '{}') as Cart;
    this._store.set('cart', this._cart);
  }
}
