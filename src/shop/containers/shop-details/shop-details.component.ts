import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import { StoreService } from '../../../store/store.service';
import { Cart, CartService } from '../../../shared/services/cart/cart.service';
import { Currency } from '../../../shared/services/currency/currency.service';
import {
  Product,
  ProductsService
} from '../../../shared/services/products/products.service';
import { ProductContentService } from '../../../shared/services/product-content/product-content.service';

@Component({
  selector: 'mshop-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.css']
})
export class ShopDetailsComponent implements OnInit, OnDestroy {
  product$!: Observable<Product | null>;
  notFound = false;
  waiting = true;

  cart!: Cart;
  currency!: Currency;
  description = 'Sorry, description is not available for this product';

  private _subscriptions: Subscription[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _store: StoreService,
    private _cartService: CartService,
    private _products: ProductsService,
    private _productContent: ProductContentService
  ) {}

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id') as string;
    this._fetchProduct(id);

    this._subscriptions = [
      this._store.select('cart').subscribe(cart => (this.cart = cart)),
      this._store
        .select('currency')
        .subscribe(currency => (this.currency = currency))
    ];
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

  onProductUpdate(product: Product, quantity: number) {
    this._cartService.update(product, quantity);
  }

  private _fetchProduct(id: string) {
    this.product$ = this._products.get(id).pipe(
      catchError(error => {
        this.notFound = true;
        return of(null);
      }),
      finalize(() => (this.waiting = false))
    );

    this.description = this._productContent.getDetails(id);
  }
}
