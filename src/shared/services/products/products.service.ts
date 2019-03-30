import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

export interface Product {
  id: string;
  name: string;
  usdPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private _http: HttpClient) {}

  list(): Observable<Product[]> {
    return this._http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  get(id: string): Observable<Product> {
    return this._http.get<Product>(`${environment.apiUrl}/products/${id}`);
  }
}
