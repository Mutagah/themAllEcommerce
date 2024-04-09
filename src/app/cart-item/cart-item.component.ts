import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() productData!: any;
  discountedPrice: any;
  itemPrice: any;
  discount: number = 10;

  constructor(private cartService: CartService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.getPriceDetails(this.productData);
  }

  // Get Price Details from the service
  getPriceDetails(productData: any) {
    this.discountedPrice =
      this.cartService.getPriceDetailsInCartItem(productData).discountedPrice;
    this.itemPrice =
      this.cartService.getPriceDetailsInCartItem(productData).price;
  }

  decreaseItemCount(productData: any) {
    this.cartService.decreaseProductCountInCart(productData);
    // Display snackbar message
    this.snackBar.open('Cart product updated successfully', 'Close', {
      duration: 4000, // Adjust as needed
    });
    // Update price details
    this.getPriceDetails(productData);
  }

  increaseItemCount(productData: any) {
    this.cartService.increaseProductCountInCart(productData);
    // Display snackbar message
    this.snackBar.open('Cart product updated successfully', 'Close', {
      duration: 4000, // Adjust as needed
    });
    this.getPriceDetails(productData);
  }

  removeItem(productData: any) {
    this.cartService.removeItemFromCart(productData);
  }
}
