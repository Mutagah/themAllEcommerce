import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseURL = 'http://localhost:4000/products';
  private categoryUrl = 'https://fakestoreapi.com/products/categories';
  private jewels = 'https://fakestoreapi.com/products/category/jewelery';
  private electronics =
    'https://fakestoreapi.com/products/category/electronics?limit=4';
  private mensClothing =
    "https://fakestoreapi.com/products/category/men's%20clothing";
  private womensClothing =
    "https://fakestoreapi.com/products/category/women's%20clothing?limit=4";

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

  //Get Product Categories
  getAllProductCategories(): Observable<any> {
    return this.httpClient.get<any>(this.categoryUrl);
  }

  getJewels(): Observable<any> {
    return this.httpClient.get<any>(this.jewels);
  }

  getElectronics(): Observable<any> {
    return this.httpClient.get<any>(this.electronics);
  }

  getMensClothing(): Observable<any> {
    return this.httpClient.get<any>(this.mensClothing);
  }

  getWoMensClothing(): Observable<any> {
    return this.httpClient.get<any>(this.womensClothing);
  }

  createProduct(product: any): Observable<Object> {
    return this.httpClient.post(`${this.baseURL}`, product);
  }

  updateProduct(id: any, product: any) {
    return this.httpClient.patch(`${this.baseURL}/${id}`, product);
  }

  deleteProduct(id: any): Observable<Object> {
    return this.httpClient.delete(`${this.baseURL}/${id}`);
  }
}
