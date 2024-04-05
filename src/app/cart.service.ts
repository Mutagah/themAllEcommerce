import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartProducts: any[] = [];
  cartSubject = new Subject();
  //Discount - Percentage
  discount: number = 10;

  constructor() {}

  addProductToCart(product: any) {
    let currentProduct = { ...product, count: 1 };
    this.cartProducts.push(currentProduct);
    this.cartSubject.next(this.cartProducts);
  }
  getAllCartItems() {
    return this.cartProducts;
  }

  //Cart Price Details
  getPriceDetailsInCartItem(product: any) {
    let priceDetails = {
      discountedPrice:
        product.price * product.count -
        (this.discount / 100) * (product.price * product.count),
      price: product.price * product.count,
    };
    return priceDetails;
  }
}
