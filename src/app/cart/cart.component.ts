import { Component, OnInit } from '@angular/core';

/*Service imports */
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';
import { BadgeService } from '../badge.service';

/*Component imports */
import { DeleteCartDialogComponent } from '../delete-cart-dialog/delete-cart-dialog.component';

/*Angular material imports */
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private productService: ProductsService,
    public dialog: MatDialog,
    private badgeService: BadgeService
  ) {}

  userId = 1;
  productId_Quantity: Array<any> = [];
  productDetails: Array<any> = [];
  dataSource: Array<any> = [];
  combinedArray: Array<any> = [];
  addedProductIds = new Set<string>();
  displayedColumns: string[] = ['image', 'title', 'price', 'quantity', 'total'];

  getTotal(productArray: any) {
    let productAmount = 0;

    let total = 0;
    productArray.forEach((product: any) => {
      productAmount = product.price * product.quantity;
      total += productAmount;
    });
    return total;
  }

  lessQuantity(targetedProduct: any) {
    this.dataSource.forEach((product: any) => {
      if (product.id === targetedProduct.id && product.quantity > 0) {
        product.quantity--;

        // Modify that specific cart, so you have to have the ID
        this.cartService.getAllCarts().subscribe({
          next: (carts) => {
            const userCartIndex = carts.filter((cart: any) => {
              return (
                cart.userId === this.userId &&
                cart.products.find(
                  (product: any) => product.productId === targetedProduct.id
                )
              );
            });

            userCartIndex.forEach((cartItem: any) => {
              cartItem.products.forEach((product: any) => {
                if (product.productId === targetedProduct.id) {
                  product.quantity--;
                  this.cartService
                    .addMoreItemToUserCart(cartItem.id, {
                      products: cartItem.products,
                    })
                    .subscribe({
                      next: (res) => res,
                    });
                }
              });
            });
          },
        });
      } else if (targetedProduct.quantity === 0) {
        this.productId_Quantity = this.productId_Quantity.filter(
          (item: any) => item.productId !== targetedProduct.id
        );
        this.removeProductInCart(targetedProduct);
      }
    });
  }

  addQuantity(targetedProduct: any) {
    this.dataSource.forEach((product: any) => {
      if (product.id === targetedProduct.id) {
        product.quantity++;

        // Modify that specific cart, so you have to have the ID
        this.cartService.getAllCarts().subscribe({
          next: (carts) => {
            const userCartIndex = carts.filter((cart: any) => {
              return (
                cart.userId === this.userId &&
                cart.products.find(
                  (product: any) => product.productId === targetedProduct.id
                )
              );
            });

            userCartIndex.forEach((cartItem: any) => {
              cartItem.products.forEach((product: any) => {
                if (product.productId === targetedProduct.id) {
                  product.quantity++;
                  this.cartService
                    .addMoreItemToUserCart(cartItem.id, {
                      products: cartItem.products,
                    })
                    .subscribe({
                      next: (res) => res,
                    });
                }
              });
            });
          },
        });
      }
    });
  }

  removeProductInCart(specificProduct: any) {
    this.dataSource = this.dataSource.filter(
      (product: any) => product.id !== specificProduct.id
    );
    this.productId_Quantity = this.productId_Quantity.filter(
      (item: any) => item.productId !== specificProduct.id
    );
    this.cartService.getAllCarts().subscribe({
      next: (res) => {
        let currentUserProductCart = res.filter(
          (cart: any) =>
            cart.userId === this.userId &&
            cart.products.find(
              (product: any) => product.productId === specificProduct.id
            )
        );
        currentUserProductCart.forEach(
          (cartItem: any) =>
            (cartItem.products = cartItem.products.filter(
              (product: any) => product.productId !== specificProduct.id
            ))
        );

        if (currentUserProductCart[0].products.length > 0) {
          this.cartService
            .patchUserCart(currentUserProductCart[0].id, {
              products: currentUserProductCart[0].products,
            })
            .subscribe({
              next: (res) => {
                this.badgeService.decrementBadgeCount();
                res;
              },
            });
        } else {
          this.cartService.deleteCart(currentUserProductCart[0].id).subscribe({
            next: (res) => {
              this.badgeService.decrementBadgeCount();
              res;
            },
          });
        }
      },
    });

    /*
              Thought process
     -  Filter the user with that specific cart Item >> Must have the userId and that specific product Id
     -  Delete that specific product from that user and if the products array of that specific user will be empty then delete the whole cart if not the we need to make a clone of the existing products array and then remove the target product objected and leave the other products intact.
     */
  }

  openDeleteCartDialog(): void {
    this.cartService.getAllCarts().subscribe({
      next: (res) => {
        let userItemsInCart = res.filter(
          (cart: any) => cart.userId === this.userId
        );
        const dialogRef = this.dialog.open(DeleteCartDialogComponent, {
          width: '350px',
          data: userItemsInCart,
          /*
           - Find a way to filter and update the data source instantly
           - 
          */
        });
        dialogRef.componentInstance.deletedCartItems.subscribe(() => {
          this.dataSource = [];
          this.productId_Quantity = [];
          this.addedProductIds.clear();
        });
      },
    });
    /*
    - Have a method to get all carts
    - Filter according to the number of users.

     */
  }

  getItemsInCart() {
    this.cartService.getAllCarts().subscribe({
      next: (res) => {
        /* 
        1. Checking if all the response matches with the current userId
        2. If it matches then push the productId and quantity to a new array
        */

        res
          .filter(
            (item: any) =>
              item.userId === this.userId &&
              item.products.filter((product: any) => product.quantity !== 0)
          )
          .forEach((cartItem: any) =>
            cartItem.products.forEach((product: any) =>
              this.productId_Quantity.push({
                id: cartItem.id,
                productId: product.productId,
                quantity: product.quantity,
              })
            )
          );

        /*
        1.  Getting the exact product details after having the productId_Quantity
        2. Pushing the specific targeted products to productDetails
        */

        this.productService.getAllProducts().subscribe({
          next: (res) => {
            res.filter((resItem: any) => {
              !this.productId_Quantity.some((item: any) => {
                if (item.productId === resItem.id) {
                  this.productDetails.push(resItem);
                }
              });

              /*
              1. Creating a new array that would combine productDetails data and productId_Quantity data, if and only if the productId matches
              */
              this.productId_Quantity.forEach((pqItem: any) => {
                const matchingProduct = this.productDetails.find(
                  (pdItem) => pdItem.id === pqItem.productId
                );
                if (
                  matchingProduct &&
                  !this.addedProductIds.has(pqItem.productId)
                ) {
                  this.addedProductIds.add(pqItem.productId);
                  this.combinedArray.push({
                    id: pqItem.productId,
                    image: matchingProduct.image,
                    title: matchingProduct.title,
                    price: matchingProduct.price,
                    quantity: pqItem.quantity,
                  });
                }
              });
              this.dataSource = this.combinedArray;
            });
          },
        });
      },
    });
  }
  ngOnInit(): void {
    this.getItemsInCart();
  }
}
