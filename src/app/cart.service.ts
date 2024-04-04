import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  cartProducts: any[] = [];
  cartSubject = new Subject();

  constructor() {}

  addProductToCart(product:any){
    let currentProduct = {...product, count: 1};
    this.cartProducts.push(currentProduct);
    this.cartSubject.next(this.cartProducts);
  }
  getAllCartItems(){
    return this.cartProducts;
  }
}
