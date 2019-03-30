import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ShopRoutingModule } from './shop-routing.module';
import { MaterialModule } from '../material/material.module';

import { ShopComponent } from './containers/shop/shop.component';

@NgModule({
  declarations: [ShopComponent],
  imports: [
    CommonModule,
    ShopRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class ShopModule {}
