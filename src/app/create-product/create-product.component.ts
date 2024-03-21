import { Component, Inject, Input, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  myForm!: FormGroup;

  @Input() productData!: any;

  updateMode: boolean = false;

  constructor(
    private productService: ProductsService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CreateProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Inject MAT_DIALOG_DATA to receive product data
  ) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      rating: new FormControl('', Validators.required),
    });

    // Check if productData is provided (i.e., update mode)
    if (this.data && this.data.product) {
      this.productData = this.data.product; // Assign product data if provided
      this.updateMode = true; // Set update mode to true
      // Pre-populate form fields with product data
      this.myForm.patchValue({
        title: this.productData.title,
        price: this.productData.price,
        description: this.productData.description,
        category: this.productData.category,
        image: this.productData.image,
        rating: this.productData.rating,
      });
    }
  }

  onSubmit(myForm: any) {
    if (this.updateMode && myForm.valid) {
      console.log(myForm.value);
      console.log(this.productData.id);
      this.productService
        .updateProduct(this.productData.id, myForm.value)
        .subscribe((data) => data);
    } else if (!this.updateMode && myForm.valid) {
      console.log(myForm.value);
      this.productService.createProduct(myForm.value).subscribe((data) => data);
      this.snackBar.open('Product created successfully', 'Close', {
        duration: 5000, // Duration in milliseconds
      });
    }
    this.myForm.reset();
    this.dialogRef.close();
  }
}
