import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
      email: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
    });

    this.nameDetails = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
    });

    this.passwordData = new FormGroup({
      password: new FormControl('', Validators.required),
      passwordConfirmation: new FormControl('', Validators.required),
    });
  }
}
