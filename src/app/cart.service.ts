import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  cartProducts: any[] = [];

  constructor() {}

  addProductToCart(product:any){
    let currentProduct = {...product, count: 1};
    this.cartProducts.push(currentProduct);
  }
}
