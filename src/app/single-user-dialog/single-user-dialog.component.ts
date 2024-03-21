import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { Router } from '@angular/router';

/*Interface imports */
import { UserData } from '../user-interface';

/*Service imports */
import { UsersService } from '../users.service';

/*Compoent imports */
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

/*Angular material imports */
import {
  MAT_DIALOG_DATA, MatDialogRef,
  MatDialog
} from '@angular/material/dialog';

@Component({
  selector: 'app-single-user-dialog',
  templateUrl: './single-user-dialog.component.html',
  styleUrls: ['./single-user-dialog.component.css'],
})
export class SingleUserDialogComponent {
  @Output() deletedUser = new EventEmitter<number>();
  /*userDetails would be of type UserData interface */
  userDetails!: UserData;

  /*Using MAT_DIALOG_DATA to inject the user details passed to the dialog */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
     public dialog: MatDialog,
    private dialogReference: MatDialogRef<SingleUserDialogComponent>,
  ) {
    this.userDetails = data;
  }

  editUser(userId: number) {
    this.router.navigate([`edituser/${userId}`]);
    this.dialogReference.close();
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: this.userDetails,
    });
    dialogRef.componentInstance.deletedUser.subscribe((userId: number) => {
      this.deletedUser.emit(userId);
      this.dialogReference.close()
    });
  }
}

