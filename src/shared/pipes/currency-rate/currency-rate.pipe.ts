import { Pipe, PipeTransform, Inject, LOCALE_ID } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Currency } from '../../services/currency/currency.service';

@Pipe({
  name: 'currencyRate'
})
export class CurrencyRatePipe implements PipeTransform {
  ngCurrencyPipe!: CurrencyPipe;

  constructor(@Inject(LOCALE_ID) private _locale: string) {
    this.ngCurrencyPipe = new CurrencyPipe(_locale);
  }

  transform(
    value: number,
    currency: Currency = {
      code: 'USD',
      name: 'United States dollar',
      symbol: '$',
      rate: 1
    }
  ): any {
    return this.ngCurrencyPipe.transform(value * currency.rate, currency.code);
  }
}
