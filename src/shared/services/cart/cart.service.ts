import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
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
export class CartService {
  private readonly keyname = 'mshop-cart';

  private _cart!: Cart;

  constructor(private _store: StoreService) {}

  init(): Observable<StorageEvent> {
    // TODO: replace reference of window object for an injection token (so it works in other context like server side rendering, e.g. Angular Universal)
    this._setCartInStore(window.localStorage.getItem(this.keyname));

    // The follows allows inter-window communication
    // The event is only triggered by a different window
    return fromEvent<StorageEvent>(window, 'storage').pipe(
      filter(event => event.key === this.keyname),
      tap(event => this._setCartInStore(event.newValue))
    );
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
  }

  private _setCartInStore(value: string | null) {
    this._cart = JSON.parse(value || '{}') as Cart;
    this._store.set('cart', this._cart);
  }
}
