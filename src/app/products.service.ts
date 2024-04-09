import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseURL = 'http://localhost:4000/products';
  private categoriesURL = 'https://fakestoreapi.com/products/categories';
  private categoryURL = 'https://fakestoreapi.com/products/category';

  constructor(private httpClient: HttpClient) {}

  getAllProducts(sortBy?: string, limit?: number): Observable<any> {
    let url = this.baseURL;

    // Append sorting and limit parameters if provided
    if (sortBy) {
      url += `?sortBy=${sortBy}`;
    }
    if (limit) {
      url += `&limit=${limit}`;
    }

    return this.httpClient.get<any>(url);
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

  //Updated the Create Product Method to include the Product Category
  createProduct(product: any, category: string): Observable<Object> {
    // Include category in the product object
    product.category = category;
    return this.httpClient.post(`${this.baseURL}`, product);
  }

  updateProduct(id: any, product: any) {
    return this.httpClient.patch(`${this.baseURL}/${id}`, product);
  }

  deleteProduct(id: any): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
