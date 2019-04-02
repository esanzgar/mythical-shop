import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { ShopService } from './services/shop/shop.service';
import { CartService } from './services/cart/cart.service';
import { ProductsService } from './services/products/products.service';
import { DiscountService } from './services/discount/discount.service';
import { CurrencyService } from './services/currency/currency.service';
import { HerokuInterceptor } from './services/heroku-interceptor/heroku-interceptor';

import { GrandTotalComponent } from './containers/grand-total/grand-total.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductSummaryComponent } from './components/product-summary/product-summary.component';
import { OrderComponent } from './components/order/order.component';
import { WaitingComponent } from './components/waiting/waiting.component';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';

@NgModule({
  declarations: [
    GrandTotalComponent,
    ProductDetailsComponent,
    ProductSummaryComponent,
    OrderComponent,
    WaitingComponent,
    ProductListItemComponent
  ],
  exports: [
    GrandTotalComponent,
    ProductDetailsComponent,
    ProductSummaryComponent,
    OrderComponent,
    WaitingComponent,
    ProductListItemComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ShopService,
        CartService,
        ProductsService,
        DiscountService,
        CurrencyService,
        HerokuInterceptor
      ]
    };
  }
}
