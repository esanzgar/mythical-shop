import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CartRoutingModule } from './cart-routing.module';
import { MaterialModule } from '../material/material.module';

import { CartComponent } from './containers/cart/cart.component';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CartRoutingModule,
    MaterialModule
  ]
})
export class CartModule {}
