/*Angular imports */
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
  displayProductDropDown: boolean = false;
  accountHeaderDropDown: boolean = false;
  sidebarAccountDropDown: boolean = false;
  userLoggedIn: boolean = false;
  disableMatBadge: boolean = false;
  userRole !:any
    constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private cartService: CartService,
    private badgeService: BadgeService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userRole = window.localStorage.getItem('role')
    this.updateBadgeCount();
    this.activeRoute.queryParamMap.subscribe((queries) => {
      if (Boolean(queries.get('logout'))) {
        this.authService.logout();
      }
    });
    if (window.localStorage.getItem('role') === 'admin') {
      this.disableMatBadge = true;
    }
    if (window.localStorage.getItem('token') !== null) {
      this.userLoggedIn = true;
    }
    /* Listens to any change in badge Count and does the necessary update*/

    this.badgeService.badgeCount$.subscribe((countChange) => {
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

  logOut() {
    this.authService.logout();
    alert('You have successfully logged out');
    this.userLoggedIn = false;
  }

  toggleUserDropDownArrow() {
    this.displayUserDropDown = !this.displayUserDropDown;
  }

  toggleProductDropDown() {
    this.displayProductDropDown = !this.displayProductDropDown;
  }

  toggleAccountHeaderDropdown() {
    this.accountHeaderDropDown = !this.accountHeaderDropDown;
  }

  toggleSidebarAccountDropdown() {
    this.sidebarAccountDropDown = !this.sidebarAccountDropDown;
  }
}
