import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

/*Component import */
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

/*Service import */
import { UsersService } from '../users.service';

/* Angular Material imports*/
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  personalDetails!: FormGroup;
  geographicalDetails!: FormGroup;
  locationDetails!: FormGroup;
  userId!: number;
  userDetails: any;
  updateMode!: boolean;
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(
    private userService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
    });
  }

  ngOnInit(): void {
    if (this.userId) {
      this.updateMode = true;
      this.userService.getSpecificUser(this.userId).subscribe({
        next: (res) => {
          this.personalDetails = new FormGroup({
            firstName: new FormControl(res.name.firstname, Validators.required),
            lastName: new FormControl(res.name.lastname, Validators.required),
            userName: new FormControl(res.username, Validators.required),
            email: new FormControl(res.email, [
              Validators.required,
              Validators.email,
            ]),
          });

          this.geographicalDetails = new FormGroup({
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
          });

          this.locationDetails = new FormGroup({
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
      this.personalDetails = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        userName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
      });

      this.geographicalDetails = new FormGroup({
        phoneNumber: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        latitude: new FormControl('', Validators.required),
        longitude: new FormControl('', Validators.required),
      });

      this.locationDetails = new FormGroup({
        city: new FormControl('', Validators.required),
        street: new FormControl('', Validators.required),
        number: new FormControl('', Validators.required),
        zipCode: new FormControl('', Validators.required),
      });
    }
  }
  submitForm() {
    const formData = {
      address: {
        geolocation: {
          lat: this.geographicalDetails.value.latitude,
          long: this.geographicalDetails.value.longitude,
        },
        city: this.locationDetails.value.city,
        street: this.locationDetails.value.street,
        number: this.locationDetails.value.number,
        zipcode: this.locationDetails.value.zipCode,
      },
      email: this.personalDetails.value.email,
      username: this.personalDetails.value.userName,
      password: this.geographicalDetails.value.password,
      name: {
        firstname: this.personalDetails.value.firstName,
        lastname: this.personalDetails.value.lastName,
      },
      phone: this.geographicalDetails.value.phoneNumber,
      _v: 0,
    };
    if (this.updateMode) {
      this.userService.patchUser(this.userId, formData).subscribe({
        next: () => {
          this.snackbar.openFromComponent(SnackBarComponent, {
            duration: 3 * 1000,
            data: {
              message: `${formData?.name?.firstname} ${formData?.name?.lastname} has been updated`,
            },
          });
          setTimeout(() => {
            this.stepper.reset();
          }, 3000);
        },
        error: (error: any) => {
          return error;
        },
        complete: () => {
          setTimeout(() => this.router.navigate(['users']), 1000);
          return 'Data successfully patched';
        },
      });
    } else {
      this.userService.createEmployee(formData).subscribe({
        next: () => {
          this.snackbar.openFromComponent(SnackBarComponent, {
            duration: 3 * 1000,
            data: {
              message: `${formData?.name?.firstname} ${formData?.name?.lastname} has been created`,
            },
          });
          setTimeout(() => {
            this.stepper.reset();
          }, 3000);
        },
        error: (error: any) => {
          return error;
        },
        complete: () => {
          this.router.navigate(['users']);
          return 'Data successfully posted';
        },
      });
    }
  }

  resetForm() {
    this.personalDetails.reset();
    this.locationDetails.reset();
    this.geographicalDetails.reset();
    this.stepper.reset();
  }
}
