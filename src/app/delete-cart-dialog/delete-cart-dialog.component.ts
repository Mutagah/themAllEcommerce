import { Component, Inject, Output, EventEmitter } from '@angular/core';

/*Service imports */
import { CartService } from '../cart.service';

/*Angular material imports */
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-cart-dialog',
  templateUrl: './delete-cart-dialog.component.html',
  styleUrls: ['./delete-cart-dialog.component.css'],
})
export class DeleteCartDialogComponent {
  @Output() deletedCartItems = new EventEmitter<void>();
  constructor(
    public dialogRef: MatDialogRef<DeleteCartDialogComponent>,
    private cartService: CartService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  userId = 1;
  deleteCart() {
    this.data.forEach((item: any) =>
      this.cartService.deleteCart(item.id).subscribe({
        next: (res) => {
          this.deletedCartItems.emit(item.id);
          return res;
        },
      })
    );
    this.dialogRef.close();
  }
}
