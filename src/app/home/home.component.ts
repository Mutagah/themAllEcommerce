import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  productData: any;
  categories!: string;
  id: any;
  // Value from the Service
  searchText: any;

  limitControl: any; // Initialize form input with a default limit value

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
    // Sort - getSortedProducts
    this.productService.sortSubject.subscribe((sortCriterion: any) => {
      this.productData = this.productService.sortProducts(sortCriterion);
    });

    // Filter by Price
    // Get the priceFilter Value from the Product Service (Passed From the Header Component)
    this.productService.priceFilterSubject.subscribe((price: any) => {
      this.productService.getAllProducts().subscribe((res) => {
        this.productData = res;
        // Pass this value i.e. Price, to the getFilteredProductsByPrice() method in the Product Service to return an array of the filteredProducts in the getAllProducts() method
        this.productData = this.productService.getFilteredProductsByPrice(price);
      });
    });

    // Search Text
    this.productService.searchSubject.subscribe((searchString: any) => {
      this.searchText = searchString;
    });
  }

  getAllProducts() {
    this.productService.getAllProducts().subscribe((products) => {
      this.productData = products;
      console.log(this.productData);
    });
  }

  navigateToProduct(id: any) {
    this.router.navigate(['product', id]);
  }

  getProductCategories() {
    this.productService.getAllProductCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onSubmit(myForm: any) {
    if (myForm.valid) {
      // Convert the value to a number
      this.limitControl = parseInt(myForm.value.limitControl);
    }
  }

  clearForm() {
    this.limitControl = undefined;
  }

  // Update limitControl when input value changes
  onInputChange() {
    if (!this.limitControl) {
      this.limitControl = undefined;
    }
  }
}
