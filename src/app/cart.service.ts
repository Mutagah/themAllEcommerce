import { Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';

@Injectable({
  providedIn: 'root',
})

export class CartService {
  cartProducts: any[] = [];
  cartSubject = new Subject();
  productDeletedSubject = new Subject();

  constructor(private dialog: MatDialog) {}

  addProductToCart(product: any) {
    let currentProduct = { ...product, count: 1 };
    this.cartProducts.push(currentProduct);
    this.cartSubject.next(this.cartProducts);
  }
  getAllCartItems() {
    return this.cartProducts;
  }

  getPriceDetailsInCartItem(product: any) {
    let priceDetails = {
      price: product.price * product.count
    };
    return priceDetails;
  }

  increaseProductCountInCart(product: any) {
    //Will give us a particular index object of the cartProducts array
    let index = this.cartProducts.findIndex((productData) => {
      return productData.id === product.id;
    });
    // Update affected values
    this.cartProducts[index].count++;
    this.getPriceDetailsInCartItem(product);
    this.cartSubject.next(this.cartProducts);
  }

  decreaseProductCountInCart(product: any) {
    let index = this.cartProducts.findIndex((productData) => {
      return productData.id === product.id;
    });
    this.cartProducts[index].count--;
    this.getPriceDetailsInCartItem(product);
    this.cartSubject.next(this.cartProducts);
  }

  removeItemFromCart(product: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: { product }
    });
  
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // Find the item index
        const index = this.cartProducts.findIndex((productData) => productData.id === product.id);
        if (index !== -1) {
          // Remove the item from the cartProducts array using the index
          this.cartProducts.splice(index, 1);
          // Sending the updated cartProduct value/s
          this.cartSubject.next(this.cartProducts);
          // Emitting event indicating successful deletion
          this.productDeletedSubject.next(this.cartProducts);
        }
      }
    });
  }

  //Billing Details - Called in Price Details Component
  getBilling(cartItems: any) {
    // A single object with various attributes
    let billingDetails = {
      price: 0,
      delivery: 0,
      total: 0
    };
    cartItems.forEach((productData: any) => {
      billingDetails.price = productData.price * productData.count;
      billingDetails.total += billingDetails.price;
      
      billingDetails.total >= 200
        ? (billingDetails.delivery = 0)
        : (billingDetails.delivery = 5);
    });
    return billingDetails;
  }

  isProductInCart(product: any): boolean {
    // Checks if the product is already in the cart
    return this.cartProducts.some(item => item.id === product.id);
  }
}
