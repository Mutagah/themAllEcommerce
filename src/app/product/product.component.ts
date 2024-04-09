import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product/create-product.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmationComponent } from '../delete-confirmation/delete-confirmation.component';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  productId!: number;
  productData: any;
  categories: any;
  //Variable will be used to show and hide the two cart buttons
  isProductInCart: boolean = false;  

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
        this.productService.deleteProduct(productId).subscribe((deletedProduct) => {
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

  // Add to Cart Functionality
  addToCart(productData: any) {
    this.cartService.addProductToCart(productData);
    this.isProductInCart = true;
    
    // Display snackbar message
    this.snackBar.open('Product successfully added to the cart', 'Close', {
      duration: 4000, // Adjust as needed
    });
  }
}
