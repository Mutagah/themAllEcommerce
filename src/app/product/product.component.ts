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
  removeProduct: boolean = false;
  productId!: number;
  productData: any;
  categories: any;
  quantities: number[] = [1, 2, 3, 4, 5];
  numberOfItems: number = 1;
  receivedProducts: Array<object> = [];
  userId = 1;
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
      this.getProductInCart();
    });
  }

  getProductInCart() {
    this.cartService.getAllCarts().subscribe({
      next: (res) => {
        this.receivedProducts = res;
        res.forEach((item: any) => {
          item.products.forEach((res: any) => {
            if (res.productId === this.productId) {
              this.removeProduct = true;
              this.numberOfItems = res.quantity;
            }
          });
        });
      },
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

  cartFunctionality(productDetails: any) {
    if (!this.removeProduct) {
      let productArray = [
        {
          productId: productDetails.id,
          quantity: this.numberOfItems,
        },
      ];
      // const userId = 1;
      this.cartService.getAllCarts().subscribe({
        next: (res) => {
          // Checking if i have an existing cart with that userId
          let myUserCart = res.filter(
            (userCart: any) => userCart.userId === this.userId
          );
          // Checking if there is a record that matches the current date.
          if (
            myUserCart.length > 0 &&
            myUserCart.find(
              (userCart: any) =>
                userCart.date ===
                `${new Date().getFullYear()}-${String(
                  new Date().getMonth() + 1
                ).padStart(2, '0')}-${String(new Date().getDate()).padStart(
                  2,
                  '0'
                )}`
            )
          ) {
            let cartId = myUserCart.find(
              (userCart: any) =>
                userCart.date ===
                `${new Date().getFullYear()}-${String(
                  new Date().getMonth() + 1
                ).padStart(2, '0')}-${String(new Date().getDate()).padStart(
                  2,
                  '0'
                )}`
            ).id;

            this.cartService.getOneCart(cartId).subscribe({
              next: (res) => {
                /* 
                Add functionality where if the productId exists then you update the specific product 
                */
                res.products = res.products.filter((productInCart: any) => {
                  return productArray.some(
                    (product: any) =>
                      product.productId !== productInCart.productId
                  );
                });
                res.products.forEach((productInCart: any) => {
                  productArray.push(productInCart);
                });
                this.cartService
                  .addMoreItemToUserCart(cartId, {
                    userId: res.userId,
                    date: res.date,
                    products: productArray,
                  })
                  .subscribe({ next: (res) => res });
              },
            });
          } else {
            this.cartService
              .addToCart({
                userId: this.userId,
                date: `${new Date().getFullYear()}-${String(
                  new Date().getMonth() + 1
                ).padStart(2, '0')}-${String(new Date().getDate()).padStart(
                  2,
                  '0'
                )}`,
                products: [
                  {
                    productId: productDetails.id,
                    quantity: this.numberOfItems,
                  },
                ],
              })
              .subscribe({
                next: (res) => {
                  return res;
                },
                error: (error) => {
                  return error;
                },
              });
          }
        },
      });
    } else {
      /*
     Thought process
     Have that id
     Delete that product in cart
     - Get to have the userID
     - Get to have which specific cart are you deleting from
     - Delete that specific product from the correct cart    
     */
      this.cartService.getAllCarts().subscribe({
        next: (res) => {
          let userCart = res.filter(
            (cartItem: any) =>
              cartItem.userId === this.userId &&
              cartItem.products.find(
                (product: any) => product.productId === productDetails.id
              )
          );

          userCart.forEach(
            (cartItem: any) =>
              (cartItem.products = cartItem.products.filter(
                (item: any) => item.productId !== productDetails.id
              ))
          );

          if (userCart[0].products.length > 0) {
            this.cartService
              .patchUserCart(userCart[0].id, {
                products: userCart[0].products,
              })
              .subscribe({ next: (res) => res });
          } else {
            this.cartService.deleteCart(userCart[0].id).subscribe({
              next: (res) => res,
            });
          }
        },
      });
    }
    this.router.navigate(['cart']);
  }
}
