import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

/*Service imports */
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  inputTypeToggle: boolean = false;
  @ViewChild('login-form', { static: true }) myForm: any;
  constructor(private authService: AuthService, private router: Router) {}
  isEmail(email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email) === true) {
      this.inputTypeToggle = true;
      return this.inputTypeToggle;
    }

    return this.inputTypeToggle;
  }
  loginDetailSubmit(form: any) {
    this.authService.login(form.value.loginId, form.value.password).subscribe({
      next: (res: any) => {
        window.localStorage.setItem('token', res.username);
        window.localStorage.setItem('role', res.role);
        this.router.navigate(['/home']);
      },
    });
  }
}
