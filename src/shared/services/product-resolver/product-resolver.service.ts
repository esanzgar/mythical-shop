import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import {
  ProductsService,
  Product
} from '../../../shared/services/products/products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<Product[]> {
  constructor(private _products: ProductsService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Product[]> {
    return this._products.list();
  }
}
