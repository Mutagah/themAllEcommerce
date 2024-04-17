import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseURL = 'http://localhost:4000/products';
  private categoriesURL = 'https://fakestoreapi.com/products/categories';
  private categoryURL = 'https://fakestoreapi.com/products/category';

  products: any[] = [];
  sortCriterion: any;
  filteredProducts: any;
  sortSubject = new Subject();
  // Search Text Variable
  searchText: any = '';
  // Sending the searchText value to the home component via the searchSubject - Inter Component Communication
  searchSubject = new Subject();
  // Price Filter Variable
  priceFilter: any;
  // Sending the priceFilter value to the home component via the priceFilterSubject - Inter Component Communication
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

  getAllProductCategories(): Observable<any> {
    return this.httpClient.get<any>(this.categoriesURL);
  }

  getProductsByCategory(category: string): Observable<any> {
    let url = `${this.categoryURL}/${category}`;
    return this.httpClient.get<any>(url);
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

  // Get Sort Criterion i.e Low to High or Vice Versa
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

  // Received From the Home Component
  getFilteredProductsByPrice(price: any) {
    return (this.filteredProducts = this.products.filter((product: any) => {
      return product.price <= price;
    }));
  }

  // Pass the searchText value from the header component to the service
  getSearchString(searchText: any) {
    this.searchText = searchText;
    this.searchSubject.next(this.searchText);
  }
}
