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
  categories: any;
  id: any;

  constructor(
    private router: Router,
    private productService: ProductsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProductCategories();
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToCategories() {
    this.router.navigate(['categories']);
  }

  open(): void {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      width: '500px',
      data: {}, // You can pass any data to the modal here
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The modal was closed');
    });
  }

  toggleSideNav() {
    this.showSideNav = !this.showSideNav;
  }

  getProductCategories() {
    this.productService.getAllProductCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  getInCategories() {
    this.router.navigate(['category']);
  }
}
