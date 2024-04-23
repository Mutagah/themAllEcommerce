/*Angular imports */
import { Injectable } from '@angular/core';

/*Service imports */
import { UsersService } from './users.service';

/*RXjs imports */
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLogged = new Subject<boolean>();
  constructor(private userService: UsersService) {}
  // When the page loads for the first time all the users are logged out

  user!: any;

  isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  login(loginId: string, password: string) {
    return new Observable((observer) => {
      this.userService.getAllUsers().subscribe({
        next: (res) => {
          if (this.isValidEmail(loginId)) {
            this.user = res.find(
              (user: any) =>
                user.email === loginId && user.password === password
            );
            if (this.user === undefined) {
              observer.error();
            } else {
              this.isLogged.next(true);
              observer.next(this.user);
            }
          } else {
            this.user = res.find(
              (user: any) =>
                user.username === loginId && user.password === password
            );
            if (this.user === undefined) {
              observer.error();
            } else {
              this.isLogged.next(true);
              observer.next(this.user);
            }
          }
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  logout() {
    window.localStorage.clear();
  }

  isAuthenticated() {
    return this.isLogged;
  }
}
