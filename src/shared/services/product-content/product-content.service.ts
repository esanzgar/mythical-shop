import { Injectable } from '@angular/core';
import { descriptions, ProductDescription } from './products';

@Injectable({
  providedIn: 'root'
})
export class ProductContentService {
  getDetails<K extends keyof ProductDescription>(product: K) {
    return descriptions[product];
  }
}
