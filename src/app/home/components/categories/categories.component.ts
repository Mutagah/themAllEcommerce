import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryId!: number;
  categoriesData: any;
  searchText: any;

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductCategories();
    this.sortProducts();
    this.getSearchText();
    this.getFilters();
  }

  getProductCategories() {
    this.productService.productCategorySubject.subscribe((category: any) => {
      // Get All Products then Filter them by Category
      this.productService.getAllProducts().subscribe((res) => {
        this.categoriesData = res;
        // Pass Category Value to the Product Service for Filtering
        this.categoriesData =
          this.productService.getFilteredProductsByCategory(category);
        console.log(this.categoriesData);
      });
    });
  }

  sortProducts() {
    // Sort - getSortedProducts
    this.productService.sortSubject.subscribe((sortCriterion: any) => {
      this.categoriesData = this.productService.sortProducts(sortCriterion);
    });
  }

  getSearchText() {
    // Search Text
    this.productService.searchSubject.subscribe((searchString: any) => {
      this.searchText = searchString;
    });
  }

  getFilters(){
    // Filter by Price
    // Get the priceFilter Value from the Product Service (Passed From the Header Component)
    this.productService.priceFilterSubject.subscribe((price: any) => {
      this.productService.getAllProducts().subscribe((res) => {
        this.categoriesData = res;
        // Pass this value i.e. Price, to the getFilteredProductsByPrice() method in the Product Service to return an array of the filteredProducts in the getAllProducts() method
        this.categoriesData =
          this.productService.getFilteredProductsByPrice(price);
      });
    });
  }

  navigateToProduct(id: any) {
    this.router.navigate(['product', id]);
  }
}