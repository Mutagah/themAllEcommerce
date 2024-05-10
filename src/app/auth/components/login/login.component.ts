import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Usercred } from 'src/app/Model/User.model';
import { beginLogin } from 'src/app/User/User.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  constructor(private builder: FormBuilder, private store: Store){}
  
  ngOnInit(): void {
    localStorage.clear();
  }

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  userLogin() {
    if (this.loginForm.valid) {
      const _obj: Usercred = {
        username: this.loginForm.value.username as string,
        password: this.loginForm.value.password as string
      }
      this.store.dispatch(beginLogin({ usercred: _obj }))
    }
  }

  resetLogin() {
    this.loginForm.reset();
  }
}
