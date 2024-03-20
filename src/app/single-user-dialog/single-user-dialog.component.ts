import { Component, Inject } from '@angular/core';

/*Interface imports */
import { UserData } from '../user-interface';

/*Angular material imports */
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-single-user-dialog',
  templateUrl: './single-user-dialog.component.html',
  styleUrls: ['./single-user-dialog.component.css'],
})
export class SingleUserDialogComponent {
  /*userDetails would be of type UserData interface */
  userDetails!: UserData;

  /*Using MAT_DIALOG_DATA to inject the user details passed to the dialog */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.userDetails = data;
  }

}