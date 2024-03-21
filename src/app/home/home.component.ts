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

  // Form controls for sorting and limit
  sortControl = new FormControl(''); // Initialize with default value if needed
  limitControl = new FormControl(10); // Initialize with default limit value

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.productService
      .getAllProducts()
      .subscribe((products) => (this.productData = products));
  }

  navigateToProduct(id: any) {
    this.router.navigate(['product', id]);
  }

  getProductCategories() {
    this.productService.getAllProductCategories().subscribe((data) => {
      this.categories = data;
    });
  }
}
