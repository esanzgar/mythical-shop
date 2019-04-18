import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartService } from '../../../shared/services/cart/cart.service';
import { CurrencyService } from '../../../shared/services/currency/currency.service';

@Component({
  selector: 'mshop-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent implements OnInit, OnDestroy {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  private _subscription: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private _cart: CartService,
    private _currency: CurrencyService
  ) {}

  ngOnInit() {
    this._subscription = [
      this._cart.init().subscribe(),
      this._currency.init().subscribe() // TODO: catch errors finding currency
    ];
  }

  ngOnDestroy() {
    this._subscription.forEach(sub => sub.unsubscribe());
  }
}
