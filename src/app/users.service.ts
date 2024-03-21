import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  fakestoreUsersUrl = 'https://fakestoreapi.com/users';
  usersUrl = 'http://localhost:4000/users';

  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.usersUrl);
  }

  createEmployee(userData: object): Observable<any> {
    return this.httpClient.post(`${this.usersUrl}`, userData);
  }

  // getting a single user
  getSpecificUser(userId: number): Observable<any> {
    return this.httpClient.get(`${this.usersUrl}/${userId}`);
  }

  // updating a user
  patchUser(userId: number, userData: object) {
    return this.httpClient.patch(`${this.usersUrl}/${userId}`, userData);
  }

  deleteUser(userId: number): Observable<any> {
    return this.httpClient.delete(`${this.usersUrl}/${userId}`);
  }
  
}
