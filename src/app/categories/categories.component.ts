import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categoryId!: number;
  jewelsData: any;
  quantities: number[] = [1, 2, 3, 4, 5]; // Array of quantity values from 1 to 5
  electronicsData: any;
  mensData: any;
  womensData:any

  constructor(private productService: ProductsService, private router: Router) { }


  ngOnInit(): void {
    this.getJewels();
    this.getElectronics();
    this.getElectronics();
    this.getMensClothings();
    this.getWomensClothings();
  }

  getJewels() {
    this.productService.getJewels().subscribe((jewels) => {
      this.jewelsData = jewels;
    });
  }

  getElectronics() {
    this.productService.getElectronics().subscribe((electronics) => {
      this.electronicsData = electronics;
    });
  }

  getMensClothings() {
    this.productService.getMensClothing().subscribe((mensClothing) => {
      this.mensData = mensClothing
    })
  }

  getWomensClothings() {
    this.productService.getWoMensClothing().subscribe((womensClothing) => {
      this.womensData = womensClothing
    })
  }

  navigateToProduct(id: any) {
    this.router.navigate(['product', id]);
  }
}
