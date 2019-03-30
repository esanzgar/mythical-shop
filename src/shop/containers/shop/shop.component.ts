import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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
  products: Observable<Product[]>;

  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)
      ])
    ],
    shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;

  states = [{ name: 'Alabama', abbreviation: 'AL' }];

  constructor(
    private fb: FormBuilder,
    private _productsService: ProductsService
  ) {
    this.products = this._productsService.list();
  }

  ngOnInit() {}

  ngOnDestroy() {}

  onSubmit() {
    alert('Thanks!');
  }
}
