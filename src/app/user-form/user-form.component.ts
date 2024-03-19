import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  myReactiveForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

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

  submitForm() {}

  resetForm(){
    this.myReactiveForm.reset()
  }
}
