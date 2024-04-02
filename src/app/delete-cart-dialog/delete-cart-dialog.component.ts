import { Component, Inject } from '@angular/core';

/*Angular material imports */
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-delete-cart-dialog',
  templateUrl: './delete-cart-dialog.component.html',
  styleUrls: ['./delete-cart-dialog.component.css'],
})
export class DeleteCartDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteCartDialogComponent>,
    private cartService: CartService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  userId = 1;

  deleteCart() {
    this.data.forEach((item: any) =>
      this.cartService.deleteCart(item.id).subscribe({
        next: (res) => res,
      })
    );
  }
}
