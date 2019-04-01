import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { CartService } from '../../../shared/services/cart/cart.service';

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
    private _cart: CartService
  ) {}

  ngOnInit() {
    this._subscription = [this._cart.init().subscribe()];
  }

  ngOnDestroy() {
    this._subscription.forEach(sub => sub.unsubscribe());
  }
}
