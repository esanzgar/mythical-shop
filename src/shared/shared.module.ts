import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { ShopService } from './services/shop/shop.service';
import { CartService } from './services/cart/cart.service';
import { ProductsService } from './services/products/products.service';
import { BundleDiscountsService } from './services/bundle-discounts/bundle-discounts.service';
import { ProductContentService} from './services/product-content/product-content.service';
import { CurrencyService } from './services/currency/currency.service';
import { HerokuInterceptor } from './services/heroku-interceptor/heroku-interceptor';

import { GrandTotalComponent } from './containers/grand-total/grand-total.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductSummaryComponent } from './components/product-summary/product-summary.component';
import { OrderComponent } from './components/order/order.component';
import { WaitingComponent } from './components/waiting/waiting.component';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';
import { HintDiscountComponent } from './containers/hint-discount/hint-discount.component';

@NgModule({
  declarations: [
    GrandTotalComponent,
    ProductDetailsComponent,
    ProductSummaryComponent,
    OrderComponent,
    WaitingComponent,
    ProductListItemComponent,
    HintDiscountComponent
  ],
  exports: [
    GrandTotalComponent,
    ProductDetailsComponent,
    ProductSummaryComponent,
    OrderComponent,
    WaitingComponent,
    ProductListItemComponent,
    HintDiscountComponent
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
        BundleDiscountsService,
        CurrencyService,
        ProductContentService,
        HerokuInterceptor
      ]
    };
  }
}
