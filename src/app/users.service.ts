import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  fakeStoreUsersUrl = 'https://fakestoreapi.com/users';
  usersUrl = 'http://localhost:4000/users';

  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.usersUrl);
  }

  // getting a single user
  getSpecificUser(userId: number): Observable<any> {
    return this.httpClient.get(`${this.usersUrl}/${userId}`);
  }

  getUserwithNames(firstName: string, lastName: string): Observable<any> {
    return this.httpClient.get(
      `${this.usersUrl}?name.firstname=${firstName}&name.lastname=${lastName}`
    );
  }

  // Get Limited Number of users
  getLimitedUsers(limitedValue: number): Observable<any> {
    return this.httpClient.get(
      this.fakeStoreUsersUrl + '?limit=' + `${limitedValue}`
    );
  }

  // fetch users in ascending or descending order
  getSortedUsers(order: string): Observable<any> {
    return this.httpClient.get(`${this.fakeStoreUsersUrl}?sort=${order}`);
  }

  createEmployee(userData: object): Observable<any> {
    return this.httpClient.post(`${this.usersUrl}`, userData);
  }

  // updating a user
  patchUser(userId: number, userData: object) {
    return this.httpClient.patch(`${this.usersUrl}/${userId}`, userData);
  }

  deleteUser(userId: number): Observable<any> {
    return this.httpClient.delete(`${this.usersUrl}/${userId}`);
  }
}
