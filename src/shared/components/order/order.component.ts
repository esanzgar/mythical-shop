import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

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
      return;
    }
    this.form.patchValue({ quantity: 0 });
  }

  form = this._fb.group({
    quantity: [0, Validators.required]
  });

  @Output()
  productUpdate: EventEmitter<number> = new EventEmitter<number>();

  constructor(private _fb: FormBuilder) {}

  onChange(quantity: string) {
    this.productUpdate.emit(+quantity);
  }

  update(amount: number) {
    const quantityForm = this.form.get('quantity') as FormControl;
    const quantity = quantityForm.value + amount;
    if (quantity <= 0) {
      return;
    }

    this.form.patchValue({ quantity });
    this.productUpdate.emit(+quantity);
  }
}
