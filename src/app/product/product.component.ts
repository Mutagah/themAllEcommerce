import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

/*Service import */
import { ProductsService } from '../products.service';
import { CartService } from '../cart.service';

/*Component import */
import { CreateProductComponent } from '../create-product/create-product.component';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';

/*Angular material import */
import { MatDialog } from '@angular/material/dialog';
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
  quantities: number[] = [1, 2, 3, 4, 5];
  numberOfItems: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.getProductDetails(this.productId);
      this.getProductCategories();
    });
  }

  getProductDetails(productId: any) {
    this.productService.getProduct(productId).subscribe((product) => {
      this.productData = product;
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

      dialogRef.componentInstance.productUpdated.subscribe((result) => {
        console.log('The modal was closed');
        this.snackBar.open('Product updated successfully', 'Close', {
          duration: 5000,
        });
        this.router.navigate(['home']);
      });
    });
  }

  deleteProduct(productId: any) {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.productService
          .deleteProduct(productId)
          .subscribe((deletedProduct) => {
            this.snackBar.open('Product deleted successfully', 'Close', {
              duration: 5000,
            });

            this.router.navigate(['home']);
          });
      }
    });
  }

  getProductCategories() {
    this.productService.getAllProductCategories().subscribe((data) => {
      this.categories = data;
    });
    return this.categories;
  }

  addToCart(productDetails: any) {
    const requiredProductData = {
      userId: 1,
      date: `${new Date().getFullYear()}-${String(
        new Date().getMonth() + 1
      ).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`,
      products: [
        { productId: productDetails.id, quantity: this.numberOfItems },
      ],
    };
    this.cartService.addToCart(requiredProductData).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['cart']);
      },
    });
  }
}
