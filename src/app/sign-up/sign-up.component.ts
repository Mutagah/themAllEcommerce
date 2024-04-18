import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlName, FormGroup } from '@angular/forms';
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
      email: new FormControl(),
      username: new FormControl(),
    });

    this.nameDetails = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
    });

    this.passwordData = new FormGroup({
      password: new FormControl(),
      passwordConfirmation: new FormControl(),
    });
  }
}
