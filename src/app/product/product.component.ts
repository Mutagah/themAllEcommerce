import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productId!: number;
  productData: any;
  quantities: number[] = [1, 2, 3, 4, 5]; // Array of quantity values from 1 to 5

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = +params['id']; // Convert the id to a number
      console.log(this.productId);
      this.getProductDetails(this.productId);
    });
  }

  getProductDetails(productId: number) {
    this.productService.getProduct(productId).subscribe((product) => {
      this.productData = product;
      console.log(this.productData);
    });
  }
}
