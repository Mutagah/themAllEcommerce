import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../Model/User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:4000/user';

  constructor(private httpClient: HttpClient) { }

  userRegistration(userdata: Users){
    return this.httpClient.post(this.baseURL, userdata);
  }
}
