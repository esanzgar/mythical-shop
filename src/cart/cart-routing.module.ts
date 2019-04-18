import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartResolverService } from '../shared/services/cart-resolver/cart-resolver.service';
import { CurrencyResolverService } from '../shared/services/currency-resolver/currency-resolver.service';

import { CartComponent } from './containers/cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    resolve: {
      cart: CartResolverService,
      currency: CurrencyResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule {}
