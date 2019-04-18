import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  Inject,
  LOCALE_ID
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { concatMap, map, take, tap } from 'rxjs/operators';

import { StoreService } from '../../../store/store.service';
import { BundleDiscountsService } from '../../services/bundle-discounts/bundle-discounts.service';
import { CurrencyRatePipe } from '../../pipes/currency-rate/currency-rate.pipe';
import { Cart } from '../../services/cart/cart.service';
import { Currency } from '../../services/currency/currency.service';

@Component({
  selector: 'mshop-grand-total',
  templateUrl: './grand-total.component.html',
  styleUrls: ['./grand-total.component.css']
})
export class GrandTotalComponent implements OnInit, OnDestroy {
  private _currency!: Currency;
  private _exchange = new CurrencyRatePipe(this._locale);

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
    @Inject(LOCALE_ID) private _locale: string,
    private _store: StoreService,
    private _bundle: BundleDiscountsService
  ) {}

  ngOnInit() {
    const total$ = this._store.select('cart').pipe(
      map(cart => Object.values(cart)),
      tap(items => (this.numberItems = items.length)),
      concatMap(items =>
        this._store.select('currency').pipe(
          take(1),
          map(currency =>
            items.map(item => {
              const unitValue: string =
                this._exchange.transform(item.usdPrice, currency, '') || '0';
              return +unitValue * item.quantity;
            })
          )
        )
      ),
      map(amounts => amounts.reduce((acc, cur) => (acc += cur), 0)),
      concatMap(total =>
        this._bundle.discountsInCart().pipe(
          take(1),
          map(numberDiscounts => total - numberDiscounts * 0.1 * total)
        )
      ),
      tap(total => (this.total = total))
    );
    this._subscriptions = [total$.subscribe()];
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe);
  }
}
