/*Angular imports */
import { Component, OnInit } from '@angular/core';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

/* Service import*/
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';

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
  id: any;
  categories: any;
  searchText: any = '';
  cartItemCount: any;
  isSortMenuVisible: boolean = false;
  criteria: any[] = ['Price(Low to High)', 'Price(High to Low)'];
  displayUserDropDown: boolean = false;
  displayProductDropDown: Boolean = false;
  isPriceFiltersVisible: boolean = false;
  priceFilters = [100, 300];

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

  // Open Sort Menu - Sets isSortMenuVisible to true
  showSortMenu() {
    this.isSortMenuVisible = !this.isSortMenuVisible;
  }

  // Sort products by price
  sortProducts(criterion: any) {
    this.productService.getSortCriterion(criterion);
  }

  searchProduct(searchText: any) {
    this.productService.getSearchString(searchText);
  }

  toggleUserDropDownArrow() {
    this.displayUserDropDown = !this.displayUserDropDown;
  }

  toggleProductDropDown() {
    this.displayProductDropDown = !this.displayProductDropDown;
  }

  // Price Filters
  showPriceFilters() {
    this.isPriceFiltersVisible = !this.isPriceFiltersVisible;
  }

  // Pass the selected priceFilter value to the Product Service
  filterProductsByPrice(priceFilter: any) {
    this.productService.getPriceFilter(priceFilter);
  }
}
