/*Angular imports */
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/*Service imports */
import { UsersService } from '../users.service';

/*Component imports */
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

/*Angular Material imports */
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  emailUsernameDetails!: FormGroup;
  nameDetails!: FormGroup;
  passwordData!: FormGroup;
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(
    private userService: UsersService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.emailUsernameDetails = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', Validators.required),
    });

    this.nameDetails = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });

    this.passwordData = new FormGroup({
      password: new FormControl('', Validators.required),
      passwordConfirmation: new FormControl('', Validators.required),
    });
  }

  createAccount() {
    const formData = {
      email: this.emailUsernameDetails.value.email,
      username: this.emailUsernameDetails.value.username,
      name: {
        firstname: this.nameDetails.value.firstName,
        lastname: this.nameDetails.value.lastName,
      },
      password: this.passwordData.value.password,
      role: 'customer',
      phone: '',
      address: {
        geolocation: {
          lat: '',
          long: '',
        },
        city: '',
        street: '',
        number: 0,
        zipcode: '',
      },
      _v: 0,
    };
    this.userService.createEmployee(formData).subscribe({
      next: () => {
        this.snackbar.openFromComponent(SnackBarComponent, {
          duration: 3 * 1000,
          data: {
            message: `Account with the ${formData.name.firstname} ${formData.name.lastname} has been created successfully`,
          },
        });
        setTimeout(() => {
          this.stepper.reset();
        }, 3000);
        this.router.navigate(['/login']);
      },
      error: () => {
        this.snackbar.openFromComponent(SnackBarComponent, {
          duration: 3 * 1000,
          data: {
            message: `Account has not been created successfully`,
          },
        });
      },
    });
  }
}
