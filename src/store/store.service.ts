import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';

import { Cart } from '../shared/services/cart/cart.service';
import { Currency } from '../shared/services/currency/currency.service';

export interface Store {
  cart: Cart;
  currency: Currency;
}

const state: Store = {
  cart: {},
  currency: {
    code: 'USD',
    name: 'United States dollar',
    symbol: '$',
    rate: 1
  }
};

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private _state = new BehaviorSubject<Store>(state);
  private _store = this._state.asObservable().pipe(distinctUntilChanged());

  constructor() {}

  get state(): Store {
    return this._state.value;
  }

  set<P extends keyof Store>(prop: P, newState: Store[P]): void {
    this._state.next({ ...this.state, [prop]: newState });
  }

  select<P extends keyof Store>(prop: P): Observable<Store[P]> {
    return this._store.pipe(pluck(prop));
  }
}
