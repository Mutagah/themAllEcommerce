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
  // jewelsData: any;
  // quantities: number[] = [1, 2, 3, 4, 5];
  // electronicsData: any;
  // mensData: any;
  // womensData: any
  categoriesData: { [key: string]: any } = {};
  Object: any;


  constructor(private productService: ProductsService, private router: Router) { }


  ngOnInit(): void {
    // this.getJewels();
    // this.getElectronics();
    // this.getElectronics();
    // this.getMensClothings();
    // this.getWomensClothings();

    this.getCategoriesData();
  }

  getCategoriesData() {
    const categories = ['jewelery', 'electronics', 'men\'s%20clothing', 'women\'s%20clothing'];

    categories.forEach(category => {
      this.productService.getProductsByCategory(category).subscribe(data => {
        this.categoriesData[category] = data;
      });
    });
  }


  //Begining of all categories
  
  // getJewels() {
  //   this.productService.getJewels().subscribe((jewels) => {
  //     this.jewelsData = jewels;
  //   });
  // }

  // getElectronics() {
  //   this.productService.getElectronics().subscribe((electronics) => {
  //     this.electronicsData = electronics;
  //   });
  // }

  // getMensClothings() {
  //   this.productService.getMensClothing().subscribe((mensClothing) => {
  //     this.mensData = mensClothing
  //     console.log(this.mensData);
  //   })
  // }

  // getWomensClothings() {
  //   this.productService.getWoMensClothing().subscribe((womensClothing) => {
  //     this.womensData = womensClothing
  //   })
  // }

  //End of categories data

  navigateToProduct(id: any) {
    this.router.navigate(['product', id]);
  }
}
