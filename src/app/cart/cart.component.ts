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
  displayedColumns: string[] = ['image', 'title', 'price', 'quantity', 'total'];

  productId_Quantity: Array<any> = [];
  productDetails: Array<any> = [];
  dataSource: Array<any> = [];
  combinedArray: Array<any> = [];
  addedProductIds = new Set<string>();
  constructor(
    private cartService: CartService,
    private productService: ProductsService
  ) {}
  ngOnInit(): void {
    let userId = 1;
    this.cartService.getAllCarts().subscribe({
      next: (res) => {
        res
          .filter((item: any) => item.userId === userId)
          .forEach((cartItem: any) =>
            cartItem.products.forEach((product: any) =>
              this.productId_Quantity.push({
                productId: product.productId,
                quantity: product.quantity,
              })
            )
          );
        this.productService.getAllProducts().subscribe({
          next: (res) => {
            res.filter((resItem: any) => {
              !this.productId_Quantity.some((item: any) => {
                if (item.productId === resItem.id) {
                  this.productDetails.push(resItem);
                }
              });

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
