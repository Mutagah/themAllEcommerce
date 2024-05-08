import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() productData!: any;
  itemPrice: any;

  constructor(
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getPriceDetails(this.productData);
  }

  getPriceDetails(productData: any) {
    this.itemPrice =
      this.cartService.getPriceDetailsInCartItem(productData).price;
  }

  decreaseItemCount(productData: any) {
    this.cartService.decreaseProductCountInCart(productData);
    this.snackBar.open('Product quantity updated successfully', 'Close', {
      duration: 4000,
    });
    // Update price details
    this.getPriceDetails(productData);
  }

  increaseItemCount(productData: any) {
    this.cartService.increaseProductCountInCart(productData);
    this.snackBar.open('Product quantity updated successfully', 'Close', {
      duration: 4000,
    });
    // Update price details
    this.getPriceDetails(productData);
  }

  removeItem(productData: any) {
    this.cartService.removeItemFromCart(productData);
  }

  ngAfterViewInit() {
    this.cartService.productDeletedSubject.subscribe(() => {
      this.snackBar.open('Product Successfully Deleted from the Cart', 'Close', {
        duration: 4000,
      });
    });
  }
}