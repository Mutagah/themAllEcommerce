import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryId!: number;
  inCategoryData: any;
  quantities: number[] = [1, 2, 3, 4, 5]; // Array of quantity values from 1 to 5


  constructor(
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
      this.getInCategory();
  }

  getInCategory() {
    this.productService.getInCategory().subscribe((categoryData) => {
      this.inCategoryData = categoryData;
      console.log(this.inCategoryData);
    })
  }
}
