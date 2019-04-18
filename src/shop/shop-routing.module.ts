import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './containers/shop/shop.component';
import { ShopDetailsComponent } from './containers/shop-details/shop-details.component';

const routes: Routes = [
  {
    path: '',
    component: ShopComponent
  },
  {
    path: ':id',
    component: ShopDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule {}
