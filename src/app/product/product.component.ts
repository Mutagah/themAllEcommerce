import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product/create-product.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productId!: number;
  productData: any;
  categories: any;
  quantities: number[] = [1, 2, 3, 4, 5]; // Array of quantity values from 1 to 5

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      console.log(this.productId);
      this.getProductDetails(this.productId);
      this.getProductCategories();
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
        data: {
          product: updatedProduct,
          categories: this.getProductCategories(),
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log('The modal was closed');
        this.snackBar.open('Product updated successfully', 'Close', {
          duration: 5000, // Duration in milliseconds
        });
        this.router.navigate(['home']);
      });
    });
  }

  deleteProduct(productId: any) {
    this.productService.deleteProduct(productId).subscribe((deletedProduct) => {
      this.productData = deletedProduct;
      console.log(this.productData);
      // Display delete success message
      this.snackBar.open('Product deleted successfully', 'Close', {
        duration: 5000, // Duration in milliseconds
      });

      // Navigate to home page after deletion
      this.router.navigate(['home']);
      this.snackBar.open('Product deleted successfully', 'Close', {
        duration: 5000, // Duration in milliseconds
      });
    });
  }

  getProductCategories() {
    this.productService.getAllProductCategories().subscribe((data) => {
      this.categories = data;
    });
    return this.categories;
  }
}
