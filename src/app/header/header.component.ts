import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products.service';

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
    private productService: ProductsService
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

  logout() {}

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
