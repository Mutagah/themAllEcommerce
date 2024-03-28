import { Component, OnInit } from '@angular/core';

/*Service imports */
import { CartService } from '../cart.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  userId = 1;
  productId_Quantity: Array<any> = [];
  productDetails: Array<any> = [];
  dataSource: Array<any> = [];
  combinedArray: Array<any> = [];
  addedProductIds = new Set<string>();
  displayedColumns: string[] = ['image', 'title', 'price', 'quantity', 'total'];
  constructor(
    private cartService: CartService,
    private productService: ProductsService
  ) { }

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
        /* Modifying that specific cart, so you have to have the ID
          - Getting all carts and filtering according to the one that matches the user Id and targetdProduct Id
          -Looping through the result array which ideally should have only one element and modifying the result array 
          -
         */
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
            userCartIndex.forEach(
              (cartItem: any) =>
              (cartItem.products = cartItem.products.filter(
                (item: any) => item.productId !== targetedProduct.id
              ))
            );
            this.cartService
              .patchUserCart(userCartIndex[0].id, {
                products: userCartIndex[0].products,
              })
              .subscribe({ next: (res) => res });
            /*
            -Modyifying the existing record 
            */
          },
        });
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

  ngOnInit(): void {
    this.cartService.getAllCarts().subscribe({
      next: (res) => {
        /* 
        1. Checking if all the response matches with the current userId
        2. If it matches then push the productId and quantity to a new array
        */

        res
          .filter((item: any) => item.userId === this.userId)
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
}
