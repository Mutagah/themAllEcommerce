import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  userCartArray: any;
  cartUrl = 'http://localhost:4000/carts';
  userCart = 'http://localhost:4000/carts/user';

  // Getting all cart users
  getAllCarts(): Observable<any> {
    return this.httpClient.get(`${this.cartUrl}`);
  }

  addToCart(product: any): Observable<any> {
    return this.httpClient.post(`${this.cartUrl}`, product);
  }

  // Getting a single cart
  getOneCart(cartId: any): Observable<any> {
    return this.httpClient.get(`${this.cartUrl}/${cartId}`);
  }

  // patch user cart product
  addMoreItemToUserCart(cartId: any, product: any): Observable<any> {
    return this.httpClient.patch(`${this.cartUrl}/${cartId}`, product);
  }
}
