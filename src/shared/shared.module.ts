import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrandTotalComponent } from './components/grand-total/grand-total.component';
import {
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatRadioModule,
  MatCardModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
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
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
