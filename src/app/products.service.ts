import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseURL = 'https://fakestoreapi.com/products';
  private categoryUrl = 'https://fakestoreapi.com/products/categories';
  private inCategoryUrl = 'https://fakestoreapi.com/products/category/jewelery';

  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpClient.get<any>(this.baseURL);
  }

  getProduct(id: any): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/${id}`);
  }

  //Get Product Categories
  getAllProductCategories(): Observable<any> {
    return this.httpClient.get<any>(this.categoryUrl);
  }

  //Get Products in Category
  getInCategory(): Observable<any> {
    return this.httpClient.get<any>(this.inCategoryUrl);
  }

  // Add a new Product
  createProduct(product: any): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, product);
  }

  // Update Product - By ID
  updateProduct(id: any, product: any) {
    return this.httpClient.patch(`${this.baseURL}/${id}`, product);
  }

  // Delete Product - By ID
  deleteProduct(id: any): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
