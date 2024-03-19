import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  // usersUrl = 'https://fakestoreapi.com/users';
  usersUrl = 'http://localhost:4000/users';

  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.usersUrl);
  }

  createEmployee(userData: object): Observable<any> {
    return this.httpClient.post(`${this.usersUrl}`, userData);
  }
}
