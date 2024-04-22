import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  emailUsernameDetails!: FormGroup;
  nameDetails!: FormGroup;
  passwordData!: FormGroup;
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
    console.log(formData);
  }
}
