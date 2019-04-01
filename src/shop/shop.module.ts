import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ShopRoutingModule } from './shop-routing.module';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { ShopComponent } from './containers/shop/shop.component';
import { ShopDetailsComponent } from './containers/shop-details/shop-details.component';

@NgModule({
  declarations: [ShopComponent, ShopDetailsComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ]
})
export class ShopModule {}
