import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product/create-product.component';

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
    private productService: ProductsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = +params['id']; // Convert the id to a number
      console.log(this.productId);
      this.getProductDetails(this.productId);
    });
  }

  getProductDetails(productId: any) {
    this.productService.getProduct(productId).subscribe((product) => {
      this.productData = product;
      console.log(this.productData);
    });
  }

  updateProduct(productId: any) {
    this.productService.getProduct(productId).subscribe((updatedProduct) => {
      const dialogRef = this.dialog.open(CreateProductComponent, {
        width: '500px',
        data: {}, // You can pass any data to the modal here
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The modal was closed');
      });

      dialogRef.componentInstance.productData = updatedProduct;
    });
  }

  deleteProduct(productId: any) {
    this.productService.deleteProduct(productId).subscribe((deletedProduct) => {
      this.productData = deletedProduct;
      console.log(this.productData);
    });
  }
}
