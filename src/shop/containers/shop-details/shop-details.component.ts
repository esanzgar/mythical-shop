import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import {
  Product,
  ProductsService
} from '../../../shared/services/products/products.service';

@Component({
  selector: 'mshop-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit {
  product$!: Observable<Product | null>;
  notFound = false;
  waiting = true;

  constructor(
    private _route: ActivatedRoute,
    private _products: ProductsService
  ) {}

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id') as string;
    this.product$ = this._products.get(id).pipe(
      catchError(error => {
        this.notFound = true;
        return of(null);
      }),
      finalize(() => (this.waiting = false))
    );
  }
}
