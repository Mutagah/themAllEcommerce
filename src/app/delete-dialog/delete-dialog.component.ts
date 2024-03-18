import { Component, Inject, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

/*Angular imports */
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
  @ViewChild('myForm', { static: true }) myForm: any;

  userDetails: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.userDetails = data;
    console.log(this.userDetails);
  }

  titleCase(input: string): string {
    if (!input) return input;
    return input.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  submitDeleteData(form: NgForm) {
    console.log(form);
  }
}
