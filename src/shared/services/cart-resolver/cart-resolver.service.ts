import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { StoreService } from '../../../store/store.service';

import { Cart } from '../cart/cart.service';

@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<Cart> {
  constructor(private _store: StoreService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Cart> {
    return this._store.select('cart').pipe(take(1));
  }
}
