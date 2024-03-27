import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryId!: number;
  categoriesData: { [key: string]: any } = {};

  constructor(
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.categoriesData);
    this.getCategoriesData();
  }

  getCategoriesData() {
    const categories = [
      'jewelery',
      'electronics',
      "men's%20clothing",
      "women's%20clothing",
    ];

    categories.forEach((category) => {
      this.productService.getProductsByCategory(category).subscribe((data) => {
        if (!this.categoriesData.hasOwnProperty(category)) {
          this.categoriesData[category] = [];
        }
        this.categoriesData[category] = data;
      });
    });
  }

  navigateToProduct(id: any) {
    this.router.navigate(['product', id]);
  }
}
