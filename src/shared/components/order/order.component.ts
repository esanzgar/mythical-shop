import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Product } from '../../services/products/products.service';
import { Cart } from '../../services/cart/cart.service';

@Component({
  selector: 'mshop-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderComponent {
  @Input()
  product: Product | null = null;

  @Input()
  set cart(newCart: Cart) {
    const prod = this.product ? newCart[this.product.id] : null;
    if (prod) {
      this.form.patchValue({ quantity: prod.quantity });
    }
  }

  form = this._fb.group({
    quantity: [0, Validators.required]
  });

  @Output()
  productUpdate: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _fb: FormBuilder) {}

  onChange(quantity: number) {
    this.productUpdate.emit(quantity);
  }
}
