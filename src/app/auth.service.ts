/*Angular imports */
import { Injectable } from '@angular/core';

/*Service imports */
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private userService: UsersService) {}
  // When the page loads for the first time all the users are logged out
  isLogged: boolean = false;
  user!: any;

  isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  login(loginId: string, password: string) {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        if (this.isValidEmail(loginId)) {
          this.user = res.find(
            (user: any) => user.email === loginId && user.password === password
          );
        } else {
          this.user = res.find(
            (user: any) =>
              user.username === loginId && user.password === password
          );
        }
        if (this.user === undefined) {
          this.isLogged = false;
        } else {
          this.isLogged = true;
        }
        return this.user;
      },
      error: (err) => err,
      complete: () => this.user,
    });
  }

  logout() {
    this.isLogged = false;
  }
  
  isAuthenticated() {
    return this.isLogged;
  }
}
