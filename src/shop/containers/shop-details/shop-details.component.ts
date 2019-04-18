import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { Cart, CartService } from '../../../shared/services/cart/cart.service';
import { StoreService } from '../../../store/store.service';
import {
  Product,
  ProductsService
} from '../../../shared/services/products/products.service';

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

  private _subscriptions: Subscription[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _products: ProductsService,
    private _store: StoreService,
    private _cartService: CartService
  ) {}

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id') as string;
    this._fetchProduct(id);

    this._subscriptions = [
      this._store.select('cart').subscribe(cart => (this.cart = cart))
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
  }
}
