import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  productUrl = 'http://localhost:4000/cart';

  addToCart(product: any): Observable<any> {
    return this.httpClient.post(`${this.productUrl}`, product);
  }
}
