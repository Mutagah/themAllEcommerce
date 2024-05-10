import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usercred, Userinfo, Users } from '../Model/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:4000/user';

  constructor(private httpClient: HttpClient) { }

  userRegistration(userdata: Users){
    return this.httpClient.post(this.baseURL, userdata);
  }

  userLogin(userdata: Usercred): Observable<Userinfo[]> {
    return this.httpClient.get<Userinfo[]>(this.baseURL + '?username=' + userdata.username + '&password=' + userdata.password);
  }

  setUserToLoaclStorage(userdata: Userinfo) {
    localStorage.setItem('userdata', JSON.stringify(userdata))
  }
}
