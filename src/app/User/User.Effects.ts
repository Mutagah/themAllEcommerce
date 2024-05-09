import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../Services/user.service';
import { beginRegister } from './User.action';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { showalert } from '../Common/App.action';

@Injectable()
export class UserEffect {
  constructor(
    private action$: Actions,
    private userService: UserService,
    private router: Router
  ) {}

  _userregister = createEffect(() =>
    this.action$.pipe(
      ofType(beginRegister),
      exhaustMap((action) => {
        return this.userService.userRegistration(action.userdata).pipe(
          map(() => {
            this.router.navigate(['/auth/login']);
            return showalert({ message: 'User Registered Successfully.', resulttype: 'pass' })
        }),
        catchError((_error) => of(showalert({ message: 'User Registerion Failed due to :.' + _error.message, resulttype: 'fail' })))
    );
      })
    )
  );
}
