/*Angular imports */
import { Component, OnInit } from '@angular/core';

/* Service import*/
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';

/*Component imports */
import { CreateProductComponent } from '../create-product/create-product.component';

/*Angular Material imports */
import { MatDialog } from '@angular/material/dialog';
import { BadgeService } from '../badge.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userId = 1;
  matBadge = 0;
  categories: any;
  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private cartService: CartService,
    private badgeService: BadgeService
  ) {}

  ngOnInit(): void {
    this.updateBadgeCount();
    /* Listens to any change in badge Count and does the necessary update*/
    this.badgeService.badgeCount$.subscribe((countChange) => {
      this.matBadge += countChange;
    });
  }

  updateBadgeCount() {
    this.cartService.getAllCarts().subscribe({
      next: (res) => {
        let uniqueProducts = new Set();
        res
          .filter((item: any) => item.userId === this.userId)
          .forEach((cart: any) =>
            cart.products.forEach((product: any) =>
              uniqueProducts.add(product.productId)
            )
          );
        this.matBadge = uniqueProducts.size;
      },
    });
  }

  productModal(): void {
    /*
  1. Fetch data ya product
  2. In the success reponse open the modal
  3.  */
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
