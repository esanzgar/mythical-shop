import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { ShopService } from './services/shop/shop.service';
import { CartService } from './services/cart/cart.service';
import { ProductsService } from './services/products/products.service';
import { DiscountService } from './services/discount/discount.service';
import { CurrencyService } from './services/currency/currency.service';

import { GrandTotalComponent } from './components/grand-total/grand-total.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductSummaryComponent } from './components/product-summary/product-summary.component';
import { OrderComponent } from './components/order/order.component';

@NgModule({
  declarations: [
    GrandTotalComponent,
    ProductDetailsComponent,
    ProductSummaryComponent,
    OrderComponent
  ],
  exports: [
    GrandTotalComponent,
    ProductDetailsComponent,
    ProductSummaryComponent,
    OrderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    ShopService,
    CartService,
    ProductsService,
    DiscountService,
    CurrencyService
  ]
})
export class SharedModule {}
