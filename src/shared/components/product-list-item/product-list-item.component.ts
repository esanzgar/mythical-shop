import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { Product } from '../../services/products/products.service';
import { Cart } from '../../services/cart/cart.service';
import { Currency } from '../../services/currency/currency.service';

@Component({
  selector: 'mshop-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListItemComponent implements OnInit {
  @Input()
  set product(newProduct: Product) {
    this._product = newProduct;
  }

  get product() {
    return this._product;
  }

  @Input()
  set cart(newCart: Cart) {
    this._cart = newCart;
  }

  get cart() {
    return this._cart;
  }

  @Input()
  set currency(newCurrency: Currency) {
    this._currency = newCurrency;
  }

  get currency() {
    return this._currency;
  }

  @Output()
  productUpdate = new EventEmitter<number>();

  private _product!: Product;
  private _cart!: Cart;
  private _currency!: Currency;

  constructor() {}

  ngOnInit() {}

  onProductUpdate(quantity: number) {
    this.productUpdate.emit(quantity);
  }
}
