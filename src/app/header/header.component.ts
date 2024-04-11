/*Angular imports */
import { Component, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

/*Service imports */
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';
import { BadgeService } from '../badge.service';
import { AuthService } from '../auth.service';

/*Component imports */
import { CreateProductComponent } from '../create-product/create-product.component';

/*Angular Material imports */
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ]),
  ],
})
export class HeaderComponent implements OnInit {
  userId = 1;
  matBadge = 0;
  categories: any;
  searchText: string = '';
  displayUserDropDown: boolean = false;
  displayProductDropDown: Boolean = false;

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private cartService: CartService,
    private badgeService: BadgeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.updateBadgeCount();
    // this.authService.login('john@gmail.com', 'm38rmF$');
    this.authService.login('mor_2314', '83r5^_');
    /* Listens to any change in badge Count and does the necessary update*/
    this.badgeService.badgeCount$.subscribe((countChange) => {
      // Modidy this function so that when the countChange is
      if (countChange === 0) {
        this.matBadge = countChange;
      } else {
        this.matBadge += countChange;
      }
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

  toggleUserDropDownArrow() {
    this.displayUserDropDown = !this.displayUserDropDown;
  }

  toggleProductDropDown() {
    this.displayProductDropDown = !this.displayProductDropDown;
  }
}
