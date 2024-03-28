/*Angular imports */
import { Component } from '@angular/core';

/* Service import*/
import { ProductsService } from '../products.service';

/*Component imports */
import { CreateProductComponent } from '../create-product/create-product.component';

/*Angular Material imports */
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  id: any;
  categories: any;
  searchText: string = '';

  constructor(
    private productService: ProductsService,
    private dialog: MatDialog
  ) {}

  productModal(): void {
    /*
  1. Fetch data ya product
  2. In the success reponse open the modal
  3.  */
    this.productService.getAllProductCategories().subscribe({
      next: (res) => {
        const dialogRef = this.dialog.open(CreateProductComponent, {
          width: '500px',
          data: {
            categories: res,
          },
        });
      },
    });
  }

  getProductCategories() {
    this.productService.getAllProductCategories().subscribe({
      next: (res) => {
        this.categories = res;
      },
    });
    return this.categories;
  }
}
