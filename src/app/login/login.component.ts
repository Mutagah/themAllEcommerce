import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';

/*Service imports */
import { AuthService } from '../auth.service';

/*Compoent imports */
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

/*Angular material imports */
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  inputTypeToggle: boolean = false;
  @ViewChild('login-form', { static: true }) myForm: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: MatSnackBar
  ) {}

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
      error: () => {
        this.snackbar.openFromComponent(SnackBarComponent, {
          data: {
            message:
              'Incorrect credentials, please create account, if you do not have one.',
          },
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      },
    });
  }
}
