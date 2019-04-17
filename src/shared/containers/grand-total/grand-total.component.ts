import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map, tap, mergeMap } from 'rxjs/operators';

import { StoreService } from '../../../store/store.service';
import { BundleDiscountsService } from '../../services/bundle-discounts/bundle-discounts.service';
import { Cart } from '../../services/cart/cart.service';
import { Currency } from '../../services/currency/currency.service';

@Component({
  selector: 'mshop-grand-total',
  templateUrl: './grand-total.component.html',
  styleUrls: ['./grand-total.component.css']
})
export class GrandTotalComponent implements OnInit, OnDestroy {
  private _currency!: Currency;

  @Input()
  set currency(value: Currency) {
    this._currency = value;
  }

  get currency() {
    return this._currency;
  }

  numberItems = 0;
  numberDiscounts$ = this._bundle.discountsInCart();
  total = 0;

  private _subscriptions: Subscription[] = [];

  constructor(
    private _store: StoreService,
    private _bundle: BundleDiscountsService
  ) {}

  ngOnInit() {
    const total$ = this._store.select('cart').pipe(
      map(cart => Object.values(cart)),
      tap(items => (this.numberItems = items.length)),
      map(items => items.map(item => item.quantity * item.usdPrice)),
      map(amounts => amounts.reduce((acc, cur) => (acc += cur), 0)),
      mergeMap(amount =>
        this.numberDiscounts$.pipe(
          map(numberDiscounts => amount - numberDiscounts * 0.1 * amount),
          tap(total => (this.total = total))
        )
      )
    );
    this._subscriptions = [total$.subscribe()];
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe);
  }
}
