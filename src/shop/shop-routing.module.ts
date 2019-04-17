import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartResolverService } from '../shared/services/cart-resolver/cart-resolver.service';
import { CurrencyResolverService } from '../shared/services/currency-resolver/currency-resolver.service';

import { ShopComponent } from './containers/shop/shop.component';
import { ShopDetailsComponent } from './containers/shop-details/shop-details.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    resolve: {
      cart: CartResolverService,
      currency: CurrencyResolverService
    }
  },
  {
    path: ':id',
    component: ShopDetailsComponent,
    resolve: {
      cart: CartResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {}
