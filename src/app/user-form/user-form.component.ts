import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

/*Service import */
import { UsersService } from '../users.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  myReactiveForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.myReactiveForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      city: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      zipCode: ['', Validators.required],
    });
  }

  submitForm() {
    const submitData = {
      email: this.myReactiveForm.value.email,
      username: this.myReactiveForm.value.userName,
      password: this.myReactiveForm.value.password,
      phone: this.myReactiveForm.value.phoneNumber,
      _v: 0,
      name: {
        firstname: this.myReactiveForm.value.firstName,
        lastname: this.myReactiveForm.value.lastName,
      },
      address: {
        geolocation: {
          lat: this.myReactiveForm.value.latitude,
          long: this.myReactiveForm.value.longitude,
        },
        city: this.myReactiveForm.value.city,
        street: this.myReactiveForm.value.street,
        number: this.myReactiveForm.value.number,
        zipcode: this.myReactiveForm.value.zipCode,
      },
    };
    this.userService.createEmployee(submitData).subscribe({
      next: () => {
        this.myReactiveForm.reset();
        this.router.navigate(['/users']);
      },
      error: (error: any) => {
        return error;
      },
      complete: () => {
        return 'Data successfully posted';
      },
    });
  }

  resetForm() {
    this.myReactiveForm.reset();
  }
}
