import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StoreService } from '../../../store/store.service';
import { Product } from '../products/products.service';
import { Cart } from '../cart/cart.service';

// const BUNDLES: Bundle = {
const BUNDLES: Record<string, Product[]> = {
  Brawler: [
    {
      id: '7dgX6XzU3Wds',
      name: 'Sword',
      usdPrice: 899
    },
    {
      id: 'VqKb4tyj9V6i',
      name: 'Shield',
      usdPrice: 1149
    }
  ],
  'Money Bags': [
    {
      id: 'IP3cv7TcZhQn',
      name: 'Platinum Coin',
      usdPrice: 399
    },
    {
      id: '500R5EHvNlNB',
      name: 'Gold Coin',
      usdPrice: 249
    }
  ],
  Figther: [
    {
      id: '7Hv0hA2nmci7',
      name: 'Knife',
      usdPrice: 349
    },
    {
      id: 'PKM5pGAh9yGm',
      name: 'Axe',
      usdPrice: 799
    },
    {
      id: '7dgX6XzU3Wds',
      name: 'Sword',
      usdPrice: 899
    }
  ]
};

export type Bundle = Record<string, Product[]>;

@Injectable({
  providedIn: 'root'
})
export class BundleDiscountsService {
  constructor(private _store: StoreService) {}

  findDiscounts(): Observable<string[]> {
    return this._productIdsInCart().pipe(
      map(cartIds =>
        Object.entries(BUNDLES)
          .filter(([key, products]) => {
            const bundleIds = products.map(product => product.id);
            const matchedIds = cartIds.filter(id => bundleIds.indexOf(id) >= 0);
            return (
              matchedIds.length > 0 && matchedIds.length !== bundleIds.length
            );
          })
          .map(([key, value]) => key)
      )
    );
  }

  getProducts(bundleName: string): Product[] | undefined {
    return BUNDLES[bundleName];
  }

  discountsInCart(): Observable<number> {
    return this._productIdsInCart().pipe(
      map(
        cartIds =>
          Object.entries(BUNDLES).filter(([key, products]) => {
            const bundleIds = products.map(product => product.id);
            const matchedIds = cartIds.filter(id => bundleIds.indexOf(id) > -1);
            return (
              matchedIds.length > 0 && matchedIds.length === bundleIds.length
            );
          }).length
      )
    );
  }

  private _productIdsInCart() {
    return this._store.select('cart').pipe(map(cart => Object.keys(cart)));
  }
}
