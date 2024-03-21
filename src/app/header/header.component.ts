import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductComponent } from '../create-product/create-product.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showSideNav: boolean = false;
  id: any;
  categories: any;
  constructor(
    private router: Router,
    private productService: ProductsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  goToHome() {
    this.router.navigate(['home']);
  }

  goToCategories() {
    this.router.navigate(['categories']);
  }

  open(): void {
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
  toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }

  getInCategories() {
    this.router.navigate(['category']);
  }

  getProductCategories() {
    this.productService.getAllProductCategories().subscribe({
      next: (res) => {
        this.categories = res;
        console.log(this.categories);
      },
    });
    console.log(this.categories);
    return this.categories;
  }
}
