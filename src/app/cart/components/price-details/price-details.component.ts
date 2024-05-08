import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-price-details',
  templateUrl: './price-details.component.html',
  styleUrls: ['./price-details.component.css'],
})
export class PriceDetailsComponent implements OnInit {
  // Inherited from the Cart Component
  cartItems: any[] = [];
  cartItemsPrice: any;
  deliveryCharge: any;
  cartItemsTotal: any;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getAllCartItems();
    this.getBillingDetails();
    this.cartService.cartSubject.subscribe((items:any)=>{
      this.cartItems = items
      this.getBillingDetails();
    })
  }

  getBillingDetails() {
    let billingDetails = this.cartService.getBilling(this.cartItems);
    this.cartItemsPrice = billingDetails.price;
    this.deliveryCharge = billingDetails.delivery;
    this.cartItemsTotal = billingDetails.total;
  }
}