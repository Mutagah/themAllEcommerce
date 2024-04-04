/*Angular imports */
import { Component, OnInit } from '@angular/core';

/* Service import*/
import { ProductsService } from '../products.service';

/*Component imports */
import { CreateProductComponent } from '../create-product/create-product.component';

/*Angular Material imports */
import { MatDialog } from '@angular/material/dialog';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  id: any;
  categories: any;
  searchText: string = '';
  cartItemCount: any;

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private cartService: CartService
  ) {}

  //Displaying the Cart Item Count on the Navbar
  ngOnInit(): void {
    this.cartService.cartSubject.subscribe((cartItems: any) => {
      this.cartItemCount = cartItems.length;
    });
  }

  productModal(): void {
    this.productService.getAllProductCategories().subscribe({
      next: (res) => {
        const dialogRef = this.dialog.open(CreateProductComponent, {
          width: '500px',
          data: {
            categories: res,
          },
        });
      },
    });
  }

  getProductCategories() {
    this.productService.getAllProductCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
    });
    return this.categories;
  }
}
