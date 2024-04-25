import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseURL = 'http://localhost:4000/products';
  private categoriesURL = 'https://fakestoreapi.com/products/categories';

  products: any[] = [];
  filteredProducts: any;

  sortCriterion: any;
  sortSubject = new Subject();

  productCategory: any;
  productCategorySubject = new Subject();

  searchText: any = '';
  searchSubject = new Subject();

  priceFilter: any;
  priceFilterSubject = new Subject();

  constructor(private httpClient: HttpClient) {}

  // All/Filtered Products Array
  getAllProducts() {
    return this.httpClient.get(this.baseURL).pipe(
      map((product: any) => {
        this.products = product;
        this.filteredProducts = this.products;
        return product;
      })
    );
  }

  getProduct(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${id}`);
  }

  createProduct(product: any, category: string): Observable<Object> {
    product.category = category;
    return this.httpClient.post(`${this.baseURL}`, product);
  }

  updateProduct(id: any, product: any) {
    return this.httpClient.patch(`${this.baseURL}/${id}`, product);
  }

  deleteProduct(id: any): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }

  // Get All Product Categories from the products using a flatMap 
  // Flattening Nested Observables
  getAllCategories() {
    let productCategory = this.products.flatMap((product: any) => {
      return product.category;
    });
    // Return an Array of Categories
    let categories = Array.from(new Set(productCategory));
    return categories;
  }

  // Get the selected product category value from the Header Component
  // Pass value to the productCategorySubject
  getProductCategory(category: any) {
    this.productCategory = category;
    this.productCategorySubject.next(this.productCategory);
  }

  // Get Category Value from the Categories Component
  // Displays Category Items
  getFilteredProductsByCategory(category: any) {
    return this.filteredProducts = this.products.filter((product: any) => {
      return product.category.includes(category);
    })
  }

  getAllProductCategories(): Observable<any> {
    return this.httpClient.get<any>(this.categoriesURL);
  }

  // Get Sort Criterion i.e Low to High or Vice-versa
  getSortCriterion(criterion: any) {
    this.sortCriterion = criterion;
    this.sortSubject.next(this.sortCriterion);
  }

  // Sort Products Functionality
  sortProducts(criteria: any) {
    switch (criteria) {
      case 'Price(Low to High)':
        this.filteredProducts.sort((a: any, b: any) => {
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        });
        break;

      case 'Price(High to Low)':
        this.filteredProducts.sort((a: any, b: any) => {
          if (a.price > b.price) {
            return -1;
          }
          if (a.price < b.price) {
            return 1;
          }
          return 0;
        });
        break;
    }
    return this.filteredProducts;
  }

  // Get the priceFilter Value i.e. Price, from the Side Navigation Drawer inside the Header Component
  getPriceFilter(price: any) {
    this.priceFilter = price;
    // Pass this value to the Home Component via the priceFilterSubject
    this.priceFilterSubject.next(this.priceFilter);
  }

  // Get Price Value from the Home Component
  // Displays Filtered Products by Price
  getFilteredProductsByPrice(price: any) {
    return this.filteredProducts = this.products.filter((product: any) => {
      return product.price <= price;
    });
  }

  // Pass the searchText value from the header component to the service
  getSearchString(searchText: any) {
    this.searchText = searchText;
    this.searchSubject.next(this.searchText);
  }

  // Analytics Component
  showData(){
    return this.httpClient.get(this.baseURL);
  }
}
