import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StoreService } from '../../../store/store.service';
import { CartService } from '../../services/cart/cart.service';
import { BundleDiscountsService } from '../../services/bundle-discounts/bundle-discounts.service';
import { Product } from '../../services/products/products.service';

@Component({
  selector: 'mshop-hint-discount',
  templateUrl: './hint-discount.component.html',
  styleUrls: ['./hint-discount.component.css']
})
export class HintDiscountComponent {
  cart$ = this._store.select('cart');
  currency$ = this._store.select('currency');

  bundles$: Observable<string[]> = this._bundle.findDiscounts();

  constructor(
    private _bundle: BundleDiscountsService,
    private _store: StoreService,
    private _cart: CartService
  ) {}

  getBundleProducts(bundleName: string): Observable<Product[]> {
    const productsBundle = this._bundle.getProducts(bundleName) as Product[];
    return this._store.select('cart').pipe(
      map(cart => Object.keys(cart)),
      map(cartIds =>
        productsBundle.filter(item => cartIds.indexOf(item.id) < 0)
      )
    );
  }

  onProductUpdate(product: Product, quantity: number) {
    this._cart.update(product, quantity);
  }
}
