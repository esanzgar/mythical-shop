import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { StoreService } from '../../../store/store.service';
import { Cart } from '../../services/cart/cart.service';

@Component({
  selector: 'mshop-grand-total',
  templateUrl: './grand-total.component.html',
  styleUrls: ['./grand-total.component.css']
})
export class GrandTotalComponent implements OnInit, OnDestroy {
  numberItems = 0;
  numberDiscounts = 0;
  total = 0;

  private _subscriptions: Subscription[] = [];

  constructor(private _store: StoreService) {}

  ngOnInit() {
    const total$ = this._store.select('cart').pipe(
      map(cart => Object.values(cart)),
      tap(items => (this.numberItems = items.length)),
      map(items => items.map(item => item.quantity * item.usdPrice)),
      map(amounts => amounts.reduce((acc, cur) => (acc += cur), 0)),
      tap(total => (this.total = total))
    );
    this._subscriptions = [total$.subscribe()];
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe);
  }
}
