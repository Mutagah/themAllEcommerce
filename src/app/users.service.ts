import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  fakeStoreUsersUrl = 'https://fakestoreapi.com/users';

  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.fakeStoreUsersUrl);
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
}
