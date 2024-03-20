import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

/*Service import */
import { UsersService } from '../users.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  myGroup!: FormGroup;
  userId!: number;
  userDetails: any;
  updateMode!: boolean;

  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.userId = parseInt(params['id']);
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.updateMode = true;
      this.userService.getSpecificUser(this.userId).subscribe({
        next: (res) => {
          this.myGroup = new FormGroup({
            firstName: new FormControl(res.name.firstname, Validators.required),
            lastName: new FormControl(res.name.lastname, Validators.required),
            userName: new FormControl(res.username, Validators.required),
            email: new FormControl(res.email, [
              Validators.required,
              Validators.email,
            ]),
            phoneNumber: new FormControl(res.phone, Validators.required),
            password: new FormControl(res.password, Validators.required),
            latitude: new FormControl(
              res?.address?.geolocation?.lat,
              Validators.required
            ),
            longitude: new FormControl(
              res.address?.geolocation?.long,
              Validators.required
            ),
            city: new FormControl(res?.address?.city, Validators.required),
            street: new FormControl(res.address?.street, Validators.required),
            number: new FormControl(res.address?.number, Validators.required),
            zipCode: new FormControl(
              res?.address?.zipcode,
              Validators.required
            ),
          });
        },
      });
    } else {
      this.myGroup = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        userName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phoneNumber: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        latitude: new FormControl('', Validators.required),
        longitude: new FormControl('', Validators.required),
        city: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        number: new FormControl('', Validators.required),
        zipCode: new FormControl('', Validators.required),
      });
    }
  }
  submitForm() {
    const submitData = {
      email: this.myGroup.value.email,
      username: this.myGroup.value.userName,
      password: this.myGroup.value.password,
      phone: this.myGroup.value.phoneNumber,
      _v: 0,
      name: {
        firstname: this.myGroup.value.firstName,
        lastname: this.myGroup.value.lastName,
      },
      address: {
        geolocation: {
          lat: this.myGroup.value.latitude,
          long: this.myGroup.value.longitude,
        },
        city: this.myGroup.value.city,
        street: this.myGroup.value.street,
        number: this.myGroup.value.number,
        zipcode: this.myGroup.value.zipCode,
      },
    };
    if (this.updateMode) {
      this.userService.patchUser(this.userId, submitData).subscribe({
        next: () => {
          this.myGroup.reset();
          this.router.navigate(['/users']);
        },
        error: (error: any) => {
          return error;
        },
        complete: () => {
          return 'Data successfully patched';
        },
      });
    } else {
      this.userService.createEmployee(submitData).subscribe({
        next: () => {
          this.myGroup.reset();
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
  }

  resetForm() {
    this.myGroup.reset();
  }
}
