import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { concatMap, map, pluck, retry, tap } from 'rxjs/operators';

import { StoreService } from '../../../store/store.service';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  rate: number;
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService implements OnDestroy {
  private readonly _geolocationUrl = 'https://ip2c.org/s';
  private readonly _countryUrl = 'https://restcountries.eu/rest/v2/alpha';
  private readonly _exchangeUrl = 'https://api.exchangeratesapi.io';
  // private _subscription: Subscription;

  constructor(private _http: HttpClient, private _store: StoreService) {
    // this._subscription = this._init().subscribe();
  }

  ngOnDestroy() {
    // this._subscription.unsubscribe();
  }

  init() {
    return this._http
      .get(this._geolocationUrl, {
        responseType: 'text'
      })
      .pipe(
        map((response: string) => response.split(';')[2]),
        concatMap(countryCode =>
          this._http.get<{ currencies: Currency[] }>(
            `${this._countryUrl}/${countryCode}`
          )
        ),
        pluck('currencies'),
        map(currencies => currencies[0]),
        concatMap(currency => {
          const { code } = currency;
          const params = new HttpParams()
            .set('base', 'USD')
            .set('symbols', code);

          return this._http
            .get<{ rates: Record<string, number> }>(
              `${this._exchangeUrl}/latest`,
              { params }
            )
            .pipe(
              pluck('rates', code),
              map(rate => ({ ...currency, rate }))
            );
        }),
        tap(newCurrency => this._store.set('currency', newCurrency)),
        retry(2)
        // The currency value in the store has set the default currency to USD.
      );
  }
}
