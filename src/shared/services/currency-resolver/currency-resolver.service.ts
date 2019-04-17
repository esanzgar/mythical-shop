import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { StoreService } from '../../../store/store.service';

import { Currency } from '../currency/currency.service';

@Injectable({
  providedIn: 'root'
})
export class CurrencyResolverService implements Resolve<Currency> {
  constructor(private _store: StoreService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Currency> {
    return this._store.select('currency').pipe(take(1));
  }
}
