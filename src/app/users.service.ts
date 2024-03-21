import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  usersUrl = 'https://fakestoreapi.com/users';

  getAllUsers(): Observable<any> {
    return this.httpClient.get(this.usersUrl);
  }

  deleteUser(userId: number): Observable<any> {
    return this.httpClient.delete(`${this.usersUrl}/${userId}`);
  }
  
}
