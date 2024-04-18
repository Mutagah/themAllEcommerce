import {
  Component,
  EventEmitter,
  Inject,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

/*  Service imports */
import { UsersService } from '../users.service';

/*Component imports */
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

/*Angular imports */
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
  @Output() deletedUser = new EventEmitter<number>();
  @ViewChild('myForm', { static: true }) myForm: any;

  userDetails: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UsersService,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    private snackbar: MatSnackBar
  ) {
    this.userDetails = data;
    console.log(this.userDetails);
  }

  titleCase(input: string): string {
    if (!input) return input;
    return input.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  submitDeleteData(form: NgForm) {
    this.userService.deleteUser(this.userDetails.id).subscribe({
      next: () => {
        this.snackbar.openFromComponent(SnackBarComponent, {
          data: {
            message: `${form.value.firstName} ${form.value.lastName} record deleted successfully`,
          },
          duration: 5000,
        });
        this.deletedUser.emit(this.userDetails.id);
        this.dialogRef.close();
      },
      error: () => {
        this.snackbar.openFromComponent(SnackBarComponent, {
          data: {
            message: 'The targeted record has not been successfully deleted',
          },
        });
      },
    });
  }
}
