import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import {
  ProductsService,
  Product
} from '../../../shared/services/products/products.service';

@Component({
  selector: 'mshop-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnDestroy {
  waiting = true;
  products$!: Observable<Product[]>;

  form = this.fb.group({
    search: null
  });

  constructor(
    private fb: FormBuilder,
    private _productsService: ProductsService
  ) {}

  ngOnInit() {
    this.products$ = this._productsService
      .list()
      .pipe(finalize(() => (this.waiting = false)));
  }

  ngOnDestroy() {}
}
