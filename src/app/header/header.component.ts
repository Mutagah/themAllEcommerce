/*Angular imports */
import { Component, OnInit } from '@angular/core';

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

/* Service import */
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
  searchText: any = '';
  cartItemCount: any;
  isSortMenuVisible: boolean = false;
  criteria: any[] = ['Price(Low to High)', 'Price(High to Low)'];
  displayUserDropDown: boolean = false;
  displayProductDropDown: boolean = false;
  isPriceFiltersVisible: boolean = false;
  priceFilters = [100, 500, 1000];
  categories: any;
  isCategoriesVisible: boolean = false;

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getCartItemCount();
    this.getProductCategories();
  }

  getCartItemCount(){
    // Displaying the Cart Item Count on the Navbar
    this.cartService.cartSubject.subscribe((cartItems: any) => {
      this.cartItemCount = cartItems.length;
    });
  };

  getCategories(){
    // Displaying the Various Categories on the Side Navigation
    this.productService.getAllProducts().subscribe((res) => {
      this.categories = this.productService.getAllCategories();
    });
  }

  // Review
  productModal(): void {
    this.productService.getAllProductCategories().subscribe({
      next: (res) => {
        const dialogRef = this.dialog.open(CreateProductComponent, {
          // width: '500px',
          data: {
            categories: res,
          },
        });
      },
    });
  }

  // Review
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

  // Category Filters
  showCategories() {
    this.isPriceFiltersVisible = false;
    this.isCategoriesVisible = !this.isCategoriesVisible;
  }

  // Pass the selected category value to the Product Service
  filterProductsByCategory(category: any) {
    this.productService.getProductCategory(category);
    this.isCategoriesVisible = false;
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
    this.isCategoriesVisible = false;
    this.isPriceFiltersVisible = !this.isPriceFiltersVisible;
  }

  // Pass the selected priceFilter value to the Product Service
  filterProductsByPrice(priceFilter: any) {
    this.productService.getPriceFilter(priceFilter);
  }
}
