import {
  Component,
  EventEmitter,
  Inject,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';

/*  Service Imports */
import { UsersService } from '../users.service';

/*Angular imports */
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    private dialogRef: MatDialogRef<DeleteDialogComponent>
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
        this.deletedUser.emit(this.userDetails.id);
        this.dialogRef.close();
      },
    });
  }
}
