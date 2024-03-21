import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

/*Interface imports */
import { UserData } from '../user-interface';

/*Service imports */
import { UsersService } from '../users.service';

/*Angular material imports */
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-single-user-dialog',
  templateUrl: './single-user-dialog.component.html',
  styleUrls: ['./single-user-dialog.component.css'],
})
export class SingleUserDialogComponent {
  /*userDetails would be of type UserData interface */
  userDetails!: UserData;

  /*Using MAT_DIALOG_DATA to inject the user details passed to the dialog */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private dialogReference: MatDialogRef<SingleUserDialogComponent>,
  ) {
    this.userDetails = data;
  }

  editUser(userId: number) {
    this.router.navigate([`edituser/${userId}`]);
    this.dialogReference.close();
  }
}
