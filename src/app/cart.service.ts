import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  // adding to a user cart products
  addMoreItemToUserCart(cartId: any, product: any): Observable<any> {
    return this.httpClient.patch(`${this.cartUrl}/${cartId}`, product);
  }

  // patch user cart product
  patchUserCart(cartId: any, product: any) {
    return this.httpClient.patch(`${this.cartUrl}/${cartId}`, product);
  }

  deleteCart(cartId: any) {
    return this.httpClient.delete(`${this.cartUrl}/${cartId}`);
  }
}
