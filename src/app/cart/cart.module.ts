import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { PriceDetailsComponent } from './components/price-details/price-details.component';
import { MatButtonModule } from '@angular/material/button';
import { CheckoutComponent } from './components/checkout/checkout.component';


@NgModule({
  declarations: [
    CartComponent,
    CartItemComponent,
    PriceDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class CartModule { }
